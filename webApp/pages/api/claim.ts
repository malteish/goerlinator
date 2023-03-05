import {
  utils,
  Wallet,
  providers,
  Signer,
  Contract,
  Transaction,
} from "ethers";
import path from "path";
//import addresses from "../../private/addresses";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { existsSync, readFileSync } from "fs";
import CollectorAbi from "../../abi/Collector.json";
import { MerkleProof } from "../../components/MerkleProof";

function generateMerkleProof(address: string, leaves: string[]): [any, string] {
  if (leaves.length == 0 || address == "") {
    throw new Error("Invalid input");
  }

  let merkleTree = new MerkleTree(leaves, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
  let root = merkleTree.getHexRoot();
  console.log("Validating merkle tree...");
  console.log(`Merkle root: ${root}`);
  let proof = merkleTree.getHexProof(keccak256(address));
  //console.log(`Proof: ${proof}`);

  return [proof, root];
}

export default function handler(
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { data: any; hash?: string }): void; new (): any };
    };
  }
) {
  // Get data submitted in request's body.
  const body = JSON.parse(req.body);

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);
  console.log("address: ", body.address);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.address) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "No address provided" });
  }
  let address = body.address;

  if (!utils.isAddress(address)) {
    return res
      .status(400)
      .json({ data: `${address} is not a valid ethereum address` });
  }

  address = address.toLowerCase();

  // load leaves from file.
  let addressFile = process.env.ADDRESSES_FILE;
  if (addressFile === undefined) {
    return res.status(500).json({ data: "No leaves file provided" });
  }
  const fullPath = path.join(process.cwd(), addressFile);

  console.log("fullPath: ", fullPath);

  let addressesArray = readFileSync(fullPath).toString().split(",");
  if (!addressesArray.includes(address)) {
    return res
      .status(400)
      .json({ data: `${address} is not in the merkle tree` });
  }

  // generate merkle proof
  let [proof, root] = generateMerkleProof(address, addressesArray);

  // create signer
  let provider: providers.Provider;
  let signer: Signer;

  if (process.env.NODE_ENV === "development") {
    // use local wallet and network
    if (
      process.env.PRIVATE_KEY === undefined ||
      process.env.RPC_URL === undefined
    ) {
      return res.status(500).json({ data: "No relayer provided" });
    }
    provider = new providers.JsonRpcProvider(process.env.RPC_URL);
    signer = new Wallet(process.env.PRIVATE_KEY, provider);

    // let randomWallet = Wallet.createRandom();
    // console.log("privateKey: ", randomWallet.privateKey);
    // console.log("address: ", randomWallet.address);
  } else {
    // use relayer
    console.log("process.env.RELAYER_API_KEY: ", process.env.RELAYER_API_KEY);
    console.log(
      "process.env.RELAYER_API_SECRET: ",
      process.env.RELAYER_API_SECRET
    );
    if (
      process.env.RELAYER_API_KEY == undefined ||
      process.env.RELAYER_API_SECRET == undefined
    ) {
      console.log("No relayer provided");
      res.status(500).json({ data: "No relayer provided" });
    }

    const credentials = {
      apiKey: process.env.RELAYER_API_KEY!,
      apiSecret: process.env.RELAYER_API_SECRET!,
    };

    console.log("credentials: ", credentials);

    provider = new DefenderRelayProvider(credentials);

    signer = new DefenderRelaySigner(credentials, provider);
  }

  // create transaction
  if (process.env.COLLECTOR === undefined) {
    return res.status(500).json({ data: "Collector contract address unknown" });
  }

  // create contract
  let collector = new Contract(process.env.COLLECTOR, CollectorAbi.abi, signer);

  // collect
  collector
    .collect(proof, "", address)
    .then((txObj: Transaction) => {
      console.log("txHash: ", txObj.hash);
      // Sends a HTTP success code
      res.status(200).json({
        data: `Claim transaction has been sent to the mempool for address ${address}. You can check the status of the transaction here: https://goerli.etherscan.io/tx/${txObj.hash}`,
        hash: txObj.hash,
      });
    })
    .catch((err: Error) => {
      console.log("err: ", err);
      res.status(500).json({ data: err });
    });

  // // for dev only: send some eth to the address
  // let tx = {
  //   to: address,
  //   value: utils.parseEther("0.42"),
  // };
  // signer
  //   .sendTransaction(tx)
  //   .then((txObj) => {
  //     console.log("txHash: ", txObj.hash);
  //     // Sends a HTTP success code
  //     res.status(200).json({
  //       data: `Claim transaction has been sent to the mempool for address ${address}. You can check the status of the transaction here: https://goerli.etherscan.io/tx/${txObj.hash}`,
  //       hash: txObj.hash,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("err: ", err);
  //     res.status(500).json({ data: err });
  //   });
}
