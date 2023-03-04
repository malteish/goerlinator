import { ContractFactory, providers, utils, Wallet } from "ethers";
import { exit } from "process";
import { parse } from "ts-command-line-args";
import NetworkConfig from "../network-config";
import { existsSync, readFileSync } from "fs";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import {
  abi as CollectorAbi,
  bytecode as CollectorBytecode,
} from "../artifacts/contracts/Collector.sol/Collector.json";

interface Args {
  network: string;
  amount: string;
  leaves_file: string;
}

export async function deploy() {
  const args = parse<Args>({
    network: String,
    amount: String,
    leaves_file: String,
  });

  let rpcUrl = NetworkConfig.getRpc(args.network);
  if (rpcUrl === undefined) {
    console.error(`Could not find config for ${args.network}`);
    exit(-1);
  }
  if (!existsSync(args.leaves_file)) {
    console.error(`${args.leaves_file} does not exst.`);
    exit(-1);
  }
  if (process.env.PRIVATE_KEY === undefined) {
    console.error("No private key found.");
    exit(-1);
  }

  let provider = new providers.JsonRpcProvider(rpcUrl!);
  const signer = new Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Signer and provider created.");

  console.log("Creating merkle tree...");
  let addresses = readFileSync(args.leaves_file).toString().split(",");
  let merkleTree = new MerkleTree(addresses, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  let root = merkleTree.getHexRoot();
  console.log("Validating merkle tree...");
  // merkle tree sanity check
  var validAddress = "0xDFcEB49eD21aE199b33A76B726E2bea7A72127B0";
  console.log(`Merkle root: ${root}`);
  let proof = merkleTree.getProof(keccak256(validAddress));
  console.log(`Proof: ${proof}`);
  let sanityCheckSuccessful = merkleTree.verify(
    proof,
    keccak256(validAddress),
    root
  );
  console.log(`Proof valid: ${sanityCheckSuccessful}`);
  if (!sanityCheckSuccessful) {
    console.error("Sanity check failed. Exiting.");
    exit(-1);
  }
  console.log("Merkle tree created and valid. Merkle root: " + root);

  let amount = utils.parseEther(args.amount);
  console.log("Claim amount: " + amount);

  let factory = new ContractFactory(CollectorAbi, CollectorBytecode, signer);
  let deploy = await factory.deploy(root, amount);
  await deploy.deployTransaction.wait();
  console.log(`Deployed to ${deploy.address}`);
  console.log(
    `Verify on etherscan: npx hardhat verify --network ${args.network} ${
      deploy.address
    } ${root} ${amount.toString()}`
  );
}

deploy()
  .then()
  .catch((err) => {
    console.error(err);
    exit(-1);
  });
