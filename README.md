# Goerlinator

A Goerli testnet dusting & airdrop toolkit: batch-send dust to many addresses, collect funds back, and let recipients claim via Merkle-proof gated claims.

## Target Track

**Infrastructure and Scalability**

## Bounties Targeted

This issue is tracked here so the team can see, at a glance, which bounties the project is pursuing. The OpenZeppelin Defender integration is the primary target.

| Bounty | Priority | Status |
| --- | --- | --- |
| OpenZeppelin Defender Integration | High | In progress |
| Best Use of Infura NFT API | Medium | Planned |
| Chainlink Functions: query API? | Medium | Planned |
| Deploy a decentralized frontend component for ANY Ethereum project or hack | Medium | Planned |
| Developer Feature Bonanza (Taho) | Low | Planned |

Check items off as they land:

- [ ] OpenZeppelin Defender Integration
- [ ] Best Use of Infura NFT API
- [ ] Chainlink Functions: query API
- [ ] Decentralized frontend component
- [ ] Developer Feature Bonanza (Taho)

## Project Structure

- `contracts/` — Hardhat project with the `Duster` and `Collector` contracts, deploy/collect/withdraw scripts, Merkle tree generation, and KMS signing utilities.
- `webApp/` — Next.js frontend exposing the claim flow (`/api/claim`) and Merkle proof components.

## Getting Started

### Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

### Web App

```bash
cd webApp
npm install
npm run dev
```
