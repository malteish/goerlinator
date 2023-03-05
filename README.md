# Goerlinator

We will goerlinate you!

## When was the snapshot taken?

The snapshot was taken roughly on 2023-03-05 12:00:00 UTC.

## Which tech is used?

We heavily used [code by a16z](https://grabteeth.xyz/), with some modifications:

- we obviously used a different list of eligible addresses
- we changed the contract to allow claiming the airdrop for others
- we adapted the frontend to not require a wallet connection and work on vercel
- we use an OpenZeppelin Defender Relayer to make claiming gasless for the user

OpenZeppelin Defender acts as our hot wallet in this case.

## How to get started locally

- clone this repo
- `git submodule update --init --recursive`
- `npm install`
- `cd frontend`
- `npm run dev`
- go to `localhost:3000` in your browser

## Running the smart contract unit tests

```bash
cd backend
source .env
forge test
```

## Deploying the smart contract

```bash
cd backend
source .env
forge create --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY --verify --etherscan-api-key=$ETHERSCAN_API_KEY contracts/Goerlinator.sol:Goerlinator --constructor-args 1ether
```

Remember to change owner if that is what you want.

## Making addresses eligible

- create a list of address that should be eligible, like `backend/data/eligible_addresses.txt`
- take a deep look at the script `backend/scripts/MakeAddressesEligible.s.sol`
- adapt it to your needs, especially the `totalNumberOfAddresses` variable
- with the current, loooong address list, it needs to be executed 10 times while manually updating the `step` variable
