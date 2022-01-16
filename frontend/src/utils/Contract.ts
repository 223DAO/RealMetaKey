import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from '@ethersproject/providers'
import { BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";

// supress ts warnings for window.ethereum
declare let window: any;

const ABI = require('./KeyStoreABI.json')
const ADDRESS = '' // TODO

export class Contract {

  provider: Web3Provider | undefined
  keyStore: KeyStore

  constructor() {
    // TODO connect
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.keyStore = new ethers.Contract(ADDRESS, ABI, this.provider.getSigner()) as KeyStore
  }

  getNftData(nftId: BigNumberish) {
    return this.keyStore.nftData(nftId)
  }

  redeemKey(nftId: BigNumberish) {
    return this.keyStore.redeemKey(nftId)
  }
}

export const contract = new Contract()
