import { Provider } from "@ethersproject/abstract-provider";
import { BigNumberish, ethers, Wallet } from "ethers";
import { KeyStore } from "../types";

export class Contract {

  provider: Provider
  wallet: Wallet
  keyStore: KeyStore

  constructor() {
    // TODO
    this.provider = new ethers.providers.JsonRpcProvider('endpoint')
    this.wallet = new ethers.Wallet('privateKey', this.provider)
    this.keyStore = new ethers.Contract('address', 'abi', this.wallet) as KeyStore
  }

  redeem(nftId: BigNumberish) {
    return this.keyStore.redeemKey(nftId)
  }
}
