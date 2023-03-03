# Goerlinator

We will goerlinate you!

## How to get started locally

1. clone this repo
2. run `npm install`
3. `cd frontend`
4. `npm run dev`
5. go to `localhost:3000` in your browser

## Deploying the smart contract

```bash
cd backend
source .env
forge create --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY --verify --etherscan-api-key=$ETHERSCAN_API_KEY contracts/Goerlinator.sol:Goerlinator --constructor-args 1ether
```
