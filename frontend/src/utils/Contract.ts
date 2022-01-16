import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";
import { Promise as Bluebird } from 'bluebird';
import { metamask } from "./MetaMask";
import axios from 'axios'

// supress ts warnings for window.ethereum
declare let window: any;

const ABI = require('./KeyStoreABI.json')
const ADDRESS = '0xD69E36Af999Dc3eAa4b1264d05d2c97ca2e1618F' // TODO

export interface NftData {
  tokenId: BigNumber;
  uri: string;
  totalKeys: number;
  remainingKeys: number;
  redeemedKeys: string[];
  canRedeem: boolean;
}

export class Contract {

  provider: Web3Provider
  keyStore: KeyStore

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
    // metamask.addListener('account', () => {
    //   this.provider = new ethers.providers.Web3Provider(window.ethereum)
    //   this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
    // })
  }

  async getNftData(nftId: BigNumberish): Promise<NftData> {
    return this.keyStore.nftData(nftId)
  }

  async getNftIds() {
    return this.keyStore.getNftIds()
  }

  async getNftDatas(): Promise<NftData[] | []> {
    const ids = await this.keyStore.getNftIds()
    if (ids && ids.length > 0) {
      return Bluebird.map(ids, async (id: BigNumber) => {
        const data: any = await this.getNftData(id)
        const uri = data.uri
        console.log('load json...', uri)
        const res: any = await axios.get(uri)
        const json: any = res.data
        return { ...data, uri: json.image };
      })
    }
    return []
  }

  async redeemKey(nftId: BigNumberish) {
    const transaction = await this.keyStore.redeemKey(nftId)
    return transaction.wait()
  }
}

// export const contract = new Contract()
