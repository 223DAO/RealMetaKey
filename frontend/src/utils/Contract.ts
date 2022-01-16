import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from '@ethersproject/providers'
import { BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";

// supress ts warnings for window.ethereum
declare let window: any;

export class Contract {

  provider: Web3Provider | undefined
  keyStore: KeyStore

  constructor() {
    // TODO
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.keyStore = new ethers.Contract('address', 'abi', this.provider.getSigner()) as KeyStore
  }

  getNfts() {
    return this.keyStore.getNfts()
  }

  redeemKey(nftId: BigNumberish) {
    return this.keyStore.redeemKey(nftId)
  }
}

export const contract = new Contract()
