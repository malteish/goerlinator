/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BytesLike,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Collector, CollectorInterface } from "../Collector";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_weiPerClaim",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "graffiti",
        type: "string",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
    ],
    name: "adminUpdateRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "adminWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimed",
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
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "string",
        name: "graffiti",
        type: "string",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "collect",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610b83380380610b8383398101604081905261002f91610096565b61003833610046565b6001919091556080526100ba565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100a957600080fd5b505080516020909101519092909150565b608051610aa76100dc6000396000818161031701526103f10152610aa76000f3fe60806040526004361061007f5760003560e01c8063c884ef831161004e578063c884ef831461012c578063ebf0c7171461015c578063f2fde38b14610180578063f9edeaa2146101a057600080fd5b8063500386c61461008b578063715018a6146100c05780637c5b4a37146100d75780638da5cb5b146100f757600080fd5b3661008657005b600080fd5b34801561009757600080fd5b506100ab6100a636600461084d565b6101c0565b60405190151581526020015b60405180910390f35b3480156100cc57600080fd5b506100d561047c565b005b3480156100e357600080fd5b506100d56100f2366004610925565b610490565b34801561010357600080fd5b5060005460405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b7565b34801561013857600080fd5b506100ab61014736600461093e565b60026020526000908152604090205460ff1681565b34801561016857600080fd5b5061017260015481565b6040519081526020016100b7565b34801561018c57600080fd5b506100d561019b36600461093e565b6104c9565b3480156101ac57600080fd5b506100d56101bb366004610925565b610580565b73ffffffffffffffffffffffffffffffffffffffff811660009081526002602052604081205460ff1615610255576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f416c726561647920636c61696d6564000000000000000000000000000000000060448201526064015b60405180910390fd5b6040517fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606084901b1660208201526000906034016040516020818303038152906040528051906020012090506102af856001548361058d565b610315576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f4661696c6564206d65726b6c652070726f6f6600000000000000000000000000604482015260640161024c565b7f000000000000000000000000000000000000000000000000000000000000000047101561039f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e73756666696369656e742066756e64730000000000000000000000000000604482015260640161024c565b73ffffffffffffffffffffffffffffffffffffffff831660008181526002602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055517f000000000000000000000000000000000000000000000000000000000000000080156108fc0292909190818181858888f19350505050158015610437573d6000803e3d6000fd5b507fc8fdf13a4b928b8811a082d6f49538b13d9279cc130d1312406e8fa8742997358385604051610469929190610959565b60405180910390a1506001949350505050565b6104846105a3565b61048e6000610624565b565b6104986105a3565b604051339082156108fc029083906000818181858888f193505050501580156104c5573d6000803e3d6000fd5b5050565b6104d16105a3565b73ffffffffffffffffffffffffffffffffffffffff8116610574576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161024c565b61057d81610624565b50565b6105886105a3565b600155565b60008261059a8584610699565b14949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461048e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161024c565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600081815b84518110156106de576106ca828683815181106106bd576106bd6109e3565b60200260200101516106e6565b9150806106d681610a12565b91505061069e565b509392505050565b6000818310610702576000828152602084905260409020610711565b60008381526020839052604090205b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561078e5761078e610718565b604052919050565b600082601f8301126107a757600080fd5b813567ffffffffffffffff8111156107c1576107c1610718565b6107f260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610747565b81815284602083860101111561080757600080fd5b816020850160208301376000918101602001919091529392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461084857600080fd5b919050565b60008060006060848603121561086257600080fd5b833567ffffffffffffffff8082111561087a57600080fd5b818601915086601f83011261088e57600080fd5b81356020828211156108a2576108a2610718565b8160051b6108b1828201610747565b928352848101820192828101908b8511156108cb57600080fd5b958301955b848710156108e9578635825295830195908301906108d0565b985050508701359250508082111561090057600080fd5b5061090d86828701610796565b92505061091c60408501610824565b90509250925092565b60006020828403121561093757600080fd5b5035919050565b60006020828403121561095057600080fd5b61071182610824565b73ffffffffffffffffffffffffffffffffffffffff8316815260006020604081840152835180604085015260005b818110156109a357858101830151858201606001528201610987565b5060006060828601015260607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116850101925050509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610a6a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b506001019056fea2646970667358221220107062fd9ff51fcca9eb4ef5bf454fa9cb53a51e912945999fc74fc8ee15d8cc64736f6c63430008100033";

type CollectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CollectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Collector__factory extends ContractFactory {
  constructor(...args: CollectorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Collector";
  }

  deploy(
    _root: BytesLike,
    _weiPerClaim: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Collector> {
    return super.deploy(
      _root,
      _weiPerClaim,
      overrides || {}
    ) as Promise<Collector>;
  }
  getDeployTransaction(
    _root: BytesLike,
    _weiPerClaim: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_root, _weiPerClaim, overrides || {});
  }
  attach(address: string): Collector {
    return super.attach(address) as Collector;
  }
  connect(signer: Signer): Collector__factory {
    return super.connect(signer) as Collector__factory;
  }
  static readonly contractName: "Collector";
  public readonly contractName: "Collector";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CollectorInterface {
    return new utils.Interface(_abi) as CollectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Collector {
    return new Contract(address, _abi, signerOrProvider) as Collector;
  }
}
