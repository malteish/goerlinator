import { utils, Wallet, providers } from "ethers";

export default function handler(req, res) {
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

  if (!utils.isAddress(body.address)) {
    return res
      .status(400)
      .json({ data: `${body.address} is not a valid ethereum address` });
  }

  // send funds to address
  if (
    process.env.PRIVATE_KEY === undefined ||
    process.env.RPC_URL === undefined
  ) {
    return res.status(500).json({ data: "No relayer provided" });
  }
  let provider = new providers.JsonRpcProvider(process.env.RPC_URL);
  let relayer = new Wallet(process.env.PRIVATE_KEY, provider);
  let tx = {
    to: body.address,
    value: utils.parseEther("0.33"),
  };

  relayer.sendTransaction(tx).then((txObj) => {
    console.log("txHash: ", txObj.hash);
  });

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `Will claim for address ${body.address} now.` });
}
