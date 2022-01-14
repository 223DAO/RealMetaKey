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
    "admin()": FunctionFragment;
    "canRedeemKey()": FunctionFragment;
    "getNfts()": FunctionFragment;
    "getRedeemedKeys()": FunctionFragment;
    "redeemEnable()": FunctionFragment;
    "redeemKey(uint256)": FunctionFragment;
    "remainingKeys()": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setRedeemEnable(bool)": FunctionFragment;
    "supplyKeys(string[])": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "canRedeemKey",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getNfts", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRedeemedKeys",
    values?: undefined
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

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "canRedeemKey",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNfts", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRedeemedKeys",
    data: BytesLike
  ): Result;
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
    admin(overrides?: CallOverrides): Promise<[string]>;

    canRedeemKey(overrides?: CallOverrides): Promise<[boolean]>;

    getNfts(
      overrides?: CallOverrides
    ): Promise<
      [
        ([BigNumber, BigNumber, string, string[]] & {
          totalKeys: BigNumber;
          remainingKeys: BigNumber;
          uri: string;
          redeemedKeys: string[];
        })[]
      ] & {
        nftStates: ([BigNumber, BigNumber, string, string[]] & {
          totalKeys: BigNumber;
          remainingKeys: BigNumber;
          uri: string;
          redeemedKeys: string[];
        })[];
      }
    >;

    getRedeemedKeys(overrides?: CallOverrides): Promise<[string[]]>;

    redeemEnable(overrides?: CallOverrides): Promise<[boolean]>;

    redeemKey(
      nftId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    remainingKeys(overrides?: CallOverrides): Promise<[BigNumber]>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRedeemEnable(
      enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  canRedeemKey(overrides?: CallOverrides): Promise<boolean>;

  getNfts(
    overrides?: CallOverrides
  ): Promise<
    ([BigNumber, BigNumber, string, string[]] & {
      totalKeys: BigNumber;
      remainingKeys: BigNumber;
      uri: string;
      redeemedKeys: string[];
    })[]
  >;

  getRedeemedKeys(overrides?: CallOverrides): Promise<string[]>;

  redeemEnable(overrides?: CallOverrides): Promise<boolean>;

  redeemKey(
    nftId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

  setAdmin(
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRedeemEnable(
    enable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyKeys(
    keys: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    canRedeemKey(overrides?: CallOverrides): Promise<boolean>;

    getNfts(
      overrides?: CallOverrides
    ): Promise<
      ([BigNumber, BigNumber, string, string[]] & {
        totalKeys: BigNumber;
        remainingKeys: BigNumber;
        uri: string;
        redeemedKeys: string[];
      })[]
    >;

    getRedeemedKeys(overrides?: CallOverrides): Promise<string[]>;

    redeemEnable(overrides?: CallOverrides): Promise<boolean>;

    redeemKey(
      nftId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        [BigNumber, BigNumber, string, string[]] & {
          totalKeys: BigNumber;
          remainingKeys: BigNumber;
          uri: string;
          redeemedKeys: string[];
        }
      ] & {
        key: string;
        nftState: [BigNumber, BigNumber, string, string[]] & {
          totalKeys: BigNumber;
          remainingKeys: BigNumber;
          uri: string;
          redeemedKeys: string[];
        };
      }
    >;

    remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(_admin: string, overrides?: CallOverrides): Promise<void>;

    setRedeemEnable(enable: boolean, overrides?: CallOverrides): Promise<void>;

    supplyKeys(keys: string[], overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    canRedeemKey(overrides?: CallOverrides): Promise<BigNumber>;

    getNfts(overrides?: CallOverrides): Promise<BigNumber>;

    getRedeemedKeys(overrides?: CallOverrides): Promise<BigNumber>;

    redeemEnable(overrides?: CallOverrides): Promise<BigNumber>;

    redeemKey(
      nftId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    remainingKeys(overrides?: CallOverrides): Promise<BigNumber>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRedeemEnable(
      enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    canRedeemKey(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNfts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRedeemedKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemEnable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemKey(
      nftId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    remainingKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAdmin(
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRedeemEnable(
      enable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyKeys(
      keys: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
