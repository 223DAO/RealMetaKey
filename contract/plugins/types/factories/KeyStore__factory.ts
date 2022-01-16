/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { KeyStore, KeyStoreInterface } from "../KeyStore";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract NFT",
        name: "_nftContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "TYPE_PREMIUM",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TYPE_STANDRAD",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNftIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "type_",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "_number",
        type: "uint8",
      },
    ],
    name: "grantNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "nftData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "totalKeys",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "remainingKeys",
            type: "uint32",
          },
          {
            internalType: "string[]",
            name: "redeemedKeys",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "canRedeem",
            type: "bool",
          },
        ],
        internalType: "struct KeyStore.NFTData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemEnable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "redeemKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "remainingKeys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_enable",
        type: "bool",
      },
    ],
    name: "setRedeemEnable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
    ],
    name: "supplyKeys",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040526001600060146101000a81548160ff02191690831515021790555060006001553480156200003157600080fd5b506040516200209b3803806200209b8339818101604052810190620000579190620000ec565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050506200017a565b600081519050620000e68162000160565b92915050565b600060208284031215620000ff57600080fd5b60006200010f84828501620000d5565b91505092915050565b6000620001258262000140565b9050919050565b6000620001398262000118565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200016b816200012c565b81146200017757600080fd5b50565b60805160601c611ed8620001c3600039600081816103800152818161058c015281816107b00152818161092b015281816109d801528181610a850152610dc10152611ed86000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063896bafe911610071578063896bafe91461016757806389b86f9c146101835780638c210975146101a1578063d3116837146101d1578063f851a440146101ed578063ffe84c2a1461020b576100b4565b80634baa6cc9146100b95780635c8a54a6146100d757806363aac3a3146100f3578063704b6c021461010f5780637c43618a1461012b578063804ff14314610149575b600080fd5b6100c1610229565b6040516100ce91906119b4565b60405180910390f35b6100f160048036038101906100ec91906112ca565b610243565b005b61010d600480360381019061010891906113ba565b61037c565b005b61012960048036038101906101249190611229565b6106d6565b005b6101336107a7565b60405161014091906119f8565b60405180910390f35b6101516107ac565b60405161015e9190611875565b60405180910390f35b610181600480360381019061017c9190611350565b610861565b005b61018b61090c565b6040516101989190611897565b60405180910390f35b6101bb60048036038101906101b691906113ba565b61091f565b6040516101c89190611992565b60405180910390f35b6101eb60048036038101906101e6919061127b565b610c74565b005b6101f5610e65565b6040516102029190611823565b60405180910390f35b610213610e89565b60405161022091906119f8565b60405180910390f35b600060015460028054905061023e9190611bec565b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c8906118b2565b60405180910390fd5b60005b8282905081101561037757600283838381811061031a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b905060200281019061032c9190611a13565b90918060018154018082558091505060019003906000526020600020016000909192909192909192909192509190610365929190610ec5565b508061037090611d1e565b90506102d4565b505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636352211e836040518263ffffffff1660e01b81526004016103d791906119b4565b60206040518083038186803b1580156103ef57600080fd5b505afa158015610403573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104279190611252565b90508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610497576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048e90611952565b60405180910390fd5b600060149054906101000a900460ff166104e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104dd90611932565b60405180910390fd5b60006104f0610229565b11610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052790611972565b60405180910390fd5b600061053b8361091f565b90506000816060015163ffffffff161161058a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610581906118f2565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663770ad4e984600184606001516105d89190611c20565b6040518363ffffffff1660e01b81526004016105f59291906119cf565b600060405180830381600087803b15801561060f57600080fd5b505af1158015610623573d6000803e3d6000fd5b5050505060036000848152602001908152602001600020600260015481548110610676577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001908060018154018082558091505060019003906000526020600020016000909190919091509080546106b190611cec565b6106bc929190610f4b565b50600180546106cb9190611b96565b600181905550505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610764576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075b906118b2565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600681565b60607f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636970bb0a336040518263ffffffff1660e01b81526004016108079190611823565b60006040518083038186803b15801561081f57600080fd5b505afa158015610833573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061085c919061130f565b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e6906118b2565b60405180910390fd5b80600060146101000a81548160ff02191690831515021790555050565b600060149054906101000a900460ff1681565b610927610fd8565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16631feef08e846040518263ffffffff1660e01b815260040161098291906119b4565b60206040518083038186803b15801561099a57600080fd5b505afa1580156109ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d291906113e3565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663224cb5d0856040518263ffffffff1660e01b8152600401610a2f91906119b4565b60206040518083038186803b158015610a4757600080fd5b505afa158015610a5b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7f91906113e3565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663c87b56dd866040518263ffffffff1660e01b8152600401610adc91906119b4565b60006040518083038186803b158015610af457600080fd5b505afa158015610b08573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610b319190611379565b9050600060036000878152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610c14578382906000526020600020018054610b8790611cec565b80601f0160208091040260200160405190810160405280929190818152602001828054610bb390611cec565b8015610c005780601f10610bd557610100808354040283529160200191610c00565b820191906000526020600020905b815481529060010190602001808311610be357829003601f168201915b505050505081526020019060010190610b68565b5050505090506000610c2b8463ffffffff16610e8e565b90506040518060c001604052808881526020018481526020018663ffffffff1681526020018563ffffffff16815260200183815260200182151581525095505050505050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d02576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cf9906118b2565b60405180910390fd5b60008160ff1611610d48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3f90611912565b60405180910390fd5b600163ffffffff168263ffffffff161480610d6f5750600663ffffffff168263ffffffff16145b610dae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da5906118d2565b60405180910390fd5b60005b8160ff168160ff161015610e5f577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16637763605e8585866040518463ffffffff1660e01b8152600401610e1c9392919061183e565b600060405180830381600087803b158015610e3657600080fd5b505af1158015610e4a573d6000803e3d6000fd5b5050505080610e5890611d67565b9050610db1565b50505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600181565b60008082118015610eab5750600060149054906101000a900460ff165b8015610ebe57506000610ebc610229565b115b9050919050565b828054610ed190611cec565b90600052602060002090601f016020900481019282610ef35760008555610f3a565b82601f10610f0c57803560ff1916838001178555610f3a565b82800160010185558215610f3a579182015b82811115610f39578235825591602001919060010190610f1e565b5b509050610f47919061101c565b5090565b828054610f5790611cec565b90600052602060002090601f016020900481019282610f795760008555610fc7565b82601f10610f8a5780548555610fc7565b82800160010185558215610fc757600052602060002091601f016020900482015b82811115610fc6578254825591600101919060010190610fab565b5b509050610fd4919061101c565b5090565b6040518060c001604052806000815260200160608152602001600063ffffffff168152602001600063ffffffff168152602001606081526020016000151581525090565b5b8082111561103557600081600090555060010161101d565b5090565b600061104c61104784611a9b565b611a6a565b9050808382526020820190508285602086028201111561106b57600080fd5b60005b8581101561109b578161108188826111d5565b84526020840193506020830192505060018101905061106e565b5050509392505050565b60006110b86110b384611ac7565b611a6a565b9050828152602081018484840111156110d057600080fd5b6110db848285611cb9565b509392505050565b6000813590506110f281611e2f565b92915050565b60008151905061110781611e2f565b92915050565b60008083601f84011261111f57600080fd5b8235905067ffffffffffffffff81111561113857600080fd5b60208301915083602082028301111561115057600080fd5b9250929050565b600082601f83011261116857600080fd5b8151611178848260208601611039565b91505092915050565b60008135905061119081611e46565b92915050565b600082601f8301126111a757600080fd5b81516111b78482602086016110a5565b91505092915050565b6000813590506111cf81611e5d565b92915050565b6000815190506111e481611e5d565b92915050565b6000813590506111f981611e74565b92915050565b60008151905061120e81611e74565b92915050565b60008135905061122381611e8b565b92915050565b60006020828403121561123b57600080fd5b6000611249848285016110e3565b91505092915050565b60006020828403121561126457600080fd5b6000611272848285016110f8565b91505092915050565b60008060006060848603121561129057600080fd5b600061129e868287016110e3565b93505060206112af868287016111ea565b92505060406112c086828701611214565b9150509250925092565b600080602083850312156112dd57600080fd5b600083013567ffffffffffffffff8111156112f757600080fd5b6113038582860161110d565b92509250509250929050565b60006020828403121561132157600080fd5b600082015167ffffffffffffffff81111561133b57600080fd5b61134784828501611157565b91505092915050565b60006020828403121561136257600080fd5b600061137084828501611181565b91505092915050565b60006020828403121561138b57600080fd5b600082015167ffffffffffffffff8111156113a557600080fd5b6113b184828501611196565b91505092915050565b6000602082840312156113cc57600080fd5b60006113da848285016111c0565b91505092915050565b6000602082840312156113f557600080fd5b6000611403848285016111ff565b91505092915050565b60006114188383611538565b905092915050565b600061142c83836117e7565b60208301905092915050565b61144181611c54565b82525050565b600061145282611b17565b61145c8185611b52565b93508360208202850161146e85611af7565b8060005b858110156114aa578484038952815161148b858261140c565b945061149683611b38565b925060208a01995050600181019050611472565b50829750879550505050505092915050565b60006114c782611b22565b6114d18185611b63565b93506114dc83611b07565b8060005b8381101561150d5781516114f48882611420565b97506114ff83611b45565b9250506001810190506114e0565b5085935050505092915050565b61152381611c66565b82525050565b61153281611c66565b82525050565b600061154382611b2d565b61154d8185611b74565b935061155d818560208601611cb9565b61156681611e1e565b840191505092915050565b600061157e601383611b85565b91507f4f6e6c792061646d696e2063616e2063616c6c000000000000000000000000006000830152602082019050919050565b60006115be601183611b85565b91507f57726f6e672074797065206f66204e46540000000000000000000000000000006000830152602082019050919050565b60006115fe602383611b85565b91507f4e6f206d6f7265206b65797320617661696c61626c6520666f7220746869732060008301527f4e465400000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611664600f83611b85565b91507f4e6f204e465420746f206772616e7400000000000000000000000000000000006000830152602082019050919050565b60006116a4601783611b85565b91507f526564656d7074696f6e2064697361626c6564206e6f770000000000000000006000830152602082019050919050565b60006116e4601583611b85565b91507f4f6e6c79206f776e65722063616e2072656465656d00000000000000000000006000830152602082019050919050565b6000611724601583611b85565b91507f4e6f206d6f7265206b65797320696e2073746f726500000000000000000000006000830152602082019050919050565b600060c08301600083015161176f60008601826117e7565b50602083015184820360208601526117878282611538565b915050604083015161179c6040860182611805565b5060608301516117af6060860182611805565b50608083015184820360808601526117c78282611447565b91505060a08301516117dc60a086018261151a565b508091505092915050565b6117f081611c92565b82525050565b6117ff81611c92565b82525050565b61180e81611c9c565b82525050565b61181d81611c9c565b82525050565b60006020820190506118386000830184611438565b92915050565b60006060820190506118536000830186611438565b6118606020830185611814565b61186d6040830184611814565b949350505050565b6000602082019050818103600083015261188f81846114bc565b905092915050565b60006020820190506118ac6000830184611529565b92915050565b600060208201905081810360008301526118cb81611571565b9050919050565b600060208201905081810360008301526118eb816115b1565b9050919050565b6000602082019050818103600083015261190b816115f1565b9050919050565b6000602082019050818103600083015261192b81611657565b9050919050565b6000602082019050818103600083015261194b81611697565b9050919050565b6000602082019050818103600083015261196b816116d7565b9050919050565b6000602082019050818103600083015261198b81611717565b9050919050565b600060208201905081810360008301526119ac8184611757565b905092915050565b60006020820190506119c960008301846117f6565b92915050565b60006040820190506119e460008301856117f6565b6119f16020830184611814565b9392505050565b6000602082019050611a0d6000830184611814565b92915050565b60008083356001602003843603038112611a2c57600080fd5b80840192508235915067ffffffffffffffff821115611a4a57600080fd5b602083019250600182023603831315611a6257600080fd5b509250929050565b6000604051905081810181811067ffffffffffffffff82111715611a9157611a90611def565b5b8060405250919050565b600067ffffffffffffffff821115611ab657611ab5611def565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611ae257611ae1611def565b5b601f19601f8301169050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611ba182611c92565b9150611bac83611c92565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611be157611be0611d91565b5b828201905092915050565b6000611bf782611c92565b9150611c0283611c92565b925082821015611c1557611c14611d91565b5b828203905092915050565b6000611c2b82611c9c565b9150611c3683611c9c565b925082821015611c4957611c48611d91565b5b828203905092915050565b6000611c5f82611c72565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b60005b83811015611cd7578082015181840152602081019050611cbc565b83811115611ce6576000848401525b50505050565b60006002820490506001821680611d0457607f821691505b60208210811415611d1857611d17611dc0565b5b50919050565b6000611d2982611c92565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611d5c57611d5b611d91565b5b600182019050919050565b6000611d7282611cac565b915060ff821415611d8657611d85611d91565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b611e3881611c54565b8114611e4357600080fd5b50565b611e4f81611c66565b8114611e5a57600080fd5b50565b611e6681611c92565b8114611e7157600080fd5b50565b611e7d81611c9c565b8114611e8857600080fd5b50565b611e9481611cac565b8114611e9f57600080fd5b5056fea2646970667358221220db60689959498077a1c9de755e9050ad13d92d3431d688639d6ecde63c4e55b564736f6c63430008000033";

export class KeyStore__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _nftContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<KeyStore> {
    return super.deploy(_nftContract, overrides || {}) as Promise<KeyStore>;
  }
  getDeployTransaction(
    _nftContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_nftContract, overrides || {});
  }
  attach(address: string): KeyStore {
    return super.attach(address) as KeyStore;
  }
  connect(signer: Signer): KeyStore__factory {
    return super.connect(signer) as KeyStore__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KeyStoreInterface {
    return new utils.Interface(_abi) as KeyStoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KeyStore {
    return new Contract(address, _abi, signerOrProvider) as KeyStore;
  }
}