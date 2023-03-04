import { utils, Wallet, providers, Signer } from "ethers";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";

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
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

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

  // create transaction
  let tx = {
    to: address,
    value: utils.parseEther("0.33"),
  };

  // create signer
  let signer: Signer;

  if (process.env.NODE_ENV === "development") {
    // use local wallet and network
    if (
      process.env.PRIVATE_KEY === undefined ||
      process.env.RPC_URL === undefined
    ) {
      return res.status(500).json({ data: "No relayer provided" });
    }
    let provider = new providers.JsonRpcProvider(process.env.RPC_URL);
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

    const provider = new DefenderRelayProvider(credentials);

    signer = new DefenderRelaySigner(credentials, provider);
  }

  // send transaction
  signer
    .sendTransaction(tx)
    .then((txObj) => {
      console.log("txHash: ", txObj.hash);
      // Sends a HTTP success code
      res.status(200).json({
        data: `Claim transaction has been sent to the mempool for address ${address}. You can check the status of the transaction here: https://goerli.etherscan.io/tx/${txObj.hash}`,
        hash: txObj.hash,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ data: err });
    });

  // Found the name.
}
