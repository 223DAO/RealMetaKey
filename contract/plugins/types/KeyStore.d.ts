/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface KeyStoreInterface extends ethers.utils.Interface {
  functions: {
    "TYPE_PREMIUM()": FunctionFragment;
    "TYPE_STANDRAD()": FunctionFragment;
    "admin()": FunctionFragment;
    "getNftIds()": FunctionFragment;
    "grantNft(address,uint32,uint8)": FunctionFragment;
    "nftData(uint256)": FunctionFragment;
    "redeemEnable()": FunctionFragment;
    "redeemKey(uint256)": FunctionFragment;
    "remainingKeys()": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setRedeemEnable(bool)": FunctionFragment;
    "supplyKeys(string[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "TYPE_PREMIUM",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TYPE_STANDRAD",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(functionFragment: "getNftIds", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "grantNft",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nftData",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemEnable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemKey",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "remainingKeys",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setRedeemEnable",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyKeys",
    values: [string[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "TYPE_PREMIUM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TYPE_STANDRAD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNftIds", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nftData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemEnable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "redeemKey", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "remainingKeys",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRedeemEnable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "supplyKeys", data: BytesLike): Result;

  events: {};
}

export class KeyStore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: KeyStoreInterface;

  functions: {
    TYPE_PREMIUM(overrides?: CallOverrides): Promise<[number]>;

    TYPE_STANDRAD(overrides?: CallOverrides): Promise<[number]>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    getNftIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    grantNft(
      _receiver: string,
      type_: BigNumberish,
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nftData(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, string, number, number, string[], boolean] & {
          tokenId: BigNumber;
          uri: string;
          totalKeys: number;
          remainingKeys: number;
          redeemedKeys: string[];
          canRedeem: boolean;
        }
      ]
    >;

    redeemEnable(overrides?: CallOverrides): Promise<[boolean]>;

    redeemKey(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    remainingKeys(overrides?: CallOverrides): Promise<[BigNumber]>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRedeemEnable(
      _enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  TYPE_PREMIUM(overrides?: CallOverrides): Promise<number>;

  TYPE_STANDRAD(overrides?: CallOverrides): Promise<number>;

  admin(overrides?: CallOverrides): Promise<string>;

  getNftIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  grantNft(
    _receiver: string,
    type_: BigNumberish,
    _number: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nftData(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, number, number, string[], boolean] & {
      tokenId: BigNumber;
      uri: string;
      totalKeys: number;
      remainingKeys: number;
      redeemedKeys: string[];
      canRedeem: boolean;
    }
  >;

  redeemEnable(overrides?: CallOverrides): Promise<boolean>;

  redeemKey(
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

  setAdmin(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRedeemEnable(
    _enable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyKeys(
    keys: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    TYPE_PREMIUM(overrides?: CallOverrides): Promise<number>;

    TYPE_STANDRAD(overrides?: CallOverrides): Promise<number>;

    admin(overrides?: CallOverrides): Promise<string>;

    getNftIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    grantNft(
      _receiver: string,
      type_: BigNumberish,
      _number: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    nftData(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, number, number, string[], boolean] & {
        tokenId: BigNumber;
        uri: string;
        totalKeys: number;
        remainingKeys: number;
        redeemedKeys: string[];
        canRedeem: boolean;
      }
    >;

    redeemEnable(overrides?: CallOverrides): Promise<boolean>;

    redeemKey(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(_admin: string, overrides?: CallOverrides): Promise<void>;

    setRedeemEnable(_enable: boolean, overrides?: CallOverrides): Promise<void>;

    supplyKeys(keys: string[], overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    TYPE_PREMIUM(overrides?: CallOverrides): Promise<BigNumber>;

    TYPE_STANDRAD(overrides?: CallOverrides): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    getNftIds(overrides?: CallOverrides): Promise<BigNumber>;

    grantNft(
      _receiver: string,
      type_: BigNumberish,
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nftData(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeemEnable(overrides?: CallOverrides): Promise<BigNumber>;

    redeemKey(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRedeemEnable(
      _enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    TYPE_PREMIUM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TYPE_STANDRAD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNftIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    grantNft(
      _receiver: string,
      type_: BigNumberish,
      _number: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nftData(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    redeemEnable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemKey(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    remainingKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRedeemEnable(
      _enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
