import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";
import { Promise as Bluebird } from 'bluebird';
import { metamask } from "./MetaMask";

// supress ts warnings for window.ethereum
declare let window: any;

const ABI = require('./KeyStoreABI.json')
const ADDRESS = '0xB691488b14AabE6C6cF46C8BB486DCF06d87d020' // TODO

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
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
    metamask.addListener('account', () => {
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
      this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
    })
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
      return Bluebird.map(ids, (id: BigNumber) => {
        return this.getNftData(id);
      })
    }
    return []
  }

  async redeemKey(nftId: BigNumberish) {
    const transaction = await this.keyStore.redeemKey(nftId)
    return transaction.wait()
  }
}

export const contract = new Contract()
