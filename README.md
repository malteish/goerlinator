# Goerlinator

Automated Goerli testnet interaction toolkit — collect, dust, and manage ETH across multiple wallets via KMS-signed transactions.

## Overview

Goerlinator automates Goerli testnet operations:
- **Collector** — aggregate funds from multiple wallets into a single address
- **Duster** — distribute small amounts of ETH across many wallets (for faucet / airdrop prep)
- **Merkle claims** — generate and verify Merkle trees for claim distribution
- **KMS signing** — secure transaction signing via AWS KMS

## Architecture

```
contracts/          Hardhat project — Solidity contracts, scripts, tests
  contracts/         Solidity source
  scripts/           Deployment & automation scripts
  test/              Mocha / Chai tests
  utils/             KMS & general utilities
  typechain-types/   Generated TypeChain bindings
webApp/             Next.js frontend for Merkle proof claims
```

## Quick Start

```bash
# Install dependencies
cd contracts && npm install
cd ../webApp && npm install

# Configure network
cp contracts/network-config.example.ts contracts/network-config.ts
# Edit network-config.ts with your RPC URL and deployer address

# Compile contracts
cd contracts && npx hardhat compile

# Run tests
npx hardhat test

# Deploy
npx ts-node scripts/deploy.ts
```

## Scripts

| Script | Description |
|---|---|
| `scripts/deploy.ts` | Deploy Collector & Duster |
| `scripts/deploy-dev-dual.ts` | Deploy to two networks for testing |
| `scripts/collect.ts` | Collect ETH from multiple wallets |
| `scripts/duster/deploy.ts` | Deploy Duster contract |
| `scripts/duster/run.ts` | Execute dusting |
| `scripts/generate-tree.ts` | Generate Merkle tree from CSV |
| `scripts/combine-csvs.ts` | Combine multiple CSV inputs |
| `scripts/reformat-csv.ts` | Reformat CSV to expected schema |
| `scripts/transfer-kms.ts` | Transfer ETH via KMS-signed tx |
| `scripts/withdraw-kms.ts` | Withdraw ETH via KMS-signed tx |
| `scripts/logs.ts` | Fetch and parse event logs |

## Testing

```bash
cd contracts
npx hardhat test
```

Test files:
- `test/Duster.spec.ts`
- `test/Utils.spec.ts`
- `test/Collector.spec.ts`

---

## Hackathon Track & Bounty Targets

### Track
**Infrastructure and Scalability**

### Bounties

| Bounty | Status | Notes |
|---|---|---|
| Best Use of Infura NFT API | 🎯 Targeted | Potential NFT-based proof-of-participation distribution |
| Chainlink Functions: query API | 🎯 Targeted | Use Chainlink Functions to query on-chain data for automation triggers |
| Decentralized Frontend (Ethereum project/hack) | 🎯 Targeted | Deploy webApp frontend via IPFS + ENS for decentralized access |
| Developer Feature Bonanza (Taho) | 🎯 Targeted | Integrate Taho (formerly Tally Ho) wallet support in webApp claim flow |
| **OpenZeppelin Defender Integration** | ⭐ Primary target | Use Defender Sentinel for automated monitoring and Relayer for KMS-free tx signing |

### OpenZeppelin Defender Integration — Plan

1. **Sentinel**: Monitor `Collector` and `Duster` contracts for `Withdrawn` / `Dusted` events; alert on anomalies.
2. **Relayer**: Replace raw KMS signing in `scripts/transfer-kms.ts` and `scripts/withdraw-kms.ts` with OZ Defender Relayer API.
3. **Autotasks**: Schedule dusting runs and collection sweeps via Defender Autotasks instead of cron/CI.
4. **Admin**: Use Defender Admin for upgrade management and access control.

#### Integration touchpoints

```
contracts/utils/defender.ts          (new) — Defender Relayer + Sentinel helpers
contracts/scripts/transfer-kms.ts     (modify) — optional Defender path
contracts/scripts/withdraw-kms.ts     (modify) — optional Defender path
contracts/scripts/duster/run.ts       (modify) — optional Defender Autotask trigger
```

## License

MIT