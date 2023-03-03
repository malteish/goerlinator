# Goerlinator

We will goerlinate you!

## When was the snapshot taken?

At block [26720000](https://gnosisscan.io/block/26720000) on the gnosis chain (where most poaps live).
All addresses that were the receiver of a poap transaction before or in this block are eligible for the airdrop.

## How to get started locally

- clone this repo
- `git submodule update --init --recursive`
- `npm install`
- `cd frontend`
- `npm run dev`
- go to `localhost:3000` in your browser

## Deploying the smart contract

```bash
cd backend
source .env
forge create --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY --verify --etherscan-api-key=$ETHERSCAN_API_KEY contracts/Goerlinator.sol:Goerlinator --constructor-args 1ether
```
