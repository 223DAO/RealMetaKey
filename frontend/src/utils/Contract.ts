import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber, BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";
import { Promise as Bluebird } from 'bluebird';

// supress ts warnings for window.ethereum
declare let window: any;

const ABI = require('./KeyStoreABI.json')
const ADDRESS = '' // TODO

export interface NftData {
  tokenId: BigNumber;
  uri: string;
  totalKeys: number;
  remainingKeys: number;
  redeemedKeys: string[];
  canRedeem: boolean;
}

export class Contract {

  provider: Web3Provider | undefined
  keyStore: KeyStore

  constructor() {
    // TODO connect
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
  }

  getNftData(nftId: BigNumberish): Promise<NftData> {
    return this.keyStore.nftData(nftId)
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
