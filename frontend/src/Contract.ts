import { Web3Provider } from "@ethersproject/providers";
import { BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "./types";

// supress ts warnings for window.ethereum
declare let window: any;

export class Contract {

  provider: Web3Provider
  keyStore: KeyStore

  constructor() {
    // TODO may need to reinit provider when metamask account changed
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.keyStore = new ethers.Contract('address', 'abi', this.provider.getSigner()) as KeyStore
  }

  redeem(nftId: BigNumberish) {
    return this.keyStore.redeemKey(nftId)
  }
}
