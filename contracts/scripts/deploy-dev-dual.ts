import { Signer, utils, Wallet } from "ethers";
import { exit } from "process";

import 'dotenv/config';
import * as child from 'child_process';
import { JsonRpcProvider } from "@ethersproject/providers";

import { Collector__factory } from "../typechain-types/factories/Collector__factory";

import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { readFileSync } from "fs";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let DEFAULT_LEAVES_FILE = "./data/big-local-mt.txt"; // File to read dev leaves from
let DEV_START_BALANCE = utils.parseEther("100"); // Starting balance of each wallet in DEV_WALLETS environment variable
let CLAIM_AMOUNT = utils.parseEther("0.001"); // ETH amount per claim
let DEPOSIT_AMOUNT = utils.parseEther("1000"); // Amount to deposit in the contract

interface NodeConfig {
    chain_id: number,
    port: number
}

let Configs: NodeConfig[] =  [
    {
        chain_id: 8500,
        port: 8500
    },
    {
        chain_id: 8501,
        port: 8501
    },
]

deployDevDual().then(() => {}).catch(err => console.error(err))

export async function deployDevDual() {
    let processes = deployAnvils();
    console.log(`Running ${Configs.length} anvils.`)
    await delay(1000); // Wait for anvils
    
    // Pull dev wallet address
    let addressRaw = process.env.DEV_WALLETS;
    if (!addressRaw) {
        console.error("DEV_WALLETS env var not set.");
        exit(-1);
    }

    let devAddresses = addressRaw!.split(",");

    chainSetup(devAddresses).catch(err => {
        console.error("Chain setup failed: ", err);
        killProcesses(processes);
    });
}

function deployAnvils() {
    // Anvil info: https://book.getfoundry.sh/reference/anvil/
    let childProcesses: child.ChildProcess[] = [];
    Configs.forEach((config, index) => {
        let process = child.exec(`anvil --chain-id ${config.chain_id} --port ${config.port} --block-time 10`, 
            (error, stdout, stderr) => {
                console.log(`Anvil ${index} result`, error, stdout, stderr)
            });
        childProcesses.push(process);
    })


    process.on('SIGINT', function() {
        console.log("Caught interrupt signal");

        killProcesses(childProcesses);
    });

    return childProcesses;
}


async function chainSetup(devAddresses: string[]) {
    Configs.forEach(async (config, index) => {
        let rpcUrl = `http://localhost:${config.port}`
        let provider = new JsonRpcProvider(rpcUrl);

        // Top up
        devAddresses.forEach(async (address) => {
            await provider.send("anvil_setBalance", [address, DEV_START_BALANCE._hex]);
        })

        let deploySigner = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider) // Anvil PK 0

        let contractAddress = await deployCollector(deploySigner);

        console.log(`Deployed ${index} to ${contractAddress} on ${rpcUrl}`);

        await provider.send("anvil_setBalance", [contractAddress, DEPOSIT_AMOUNT._hex])
    })
}

async function deployCollector(signer: Signer): Promise<string> {
        let factory = new Collector__factory(signer);

        let leaves = readFileSync(DEFAULT_LEAVES_FILE).toString().split(",");

        let merkleTree = new MerkleTree(leaves, keccak256, { hashLeaves: true, sortPairs: true });
        let root = merkleTree.getHexRoot();
    
        let deploy = await factory.deploy(root, CLAIM_AMOUNT);
        await deploy.deployTransaction.wait();


        return deploy.address;
}

function killProcesses(processes: child.ChildProcess[]) {
    let results = processes.map((proc) => proc.kill());
    let failedToKill = results.findIndex(result => !result) !== -1;
    if (failedToKill) {
        console.error("Failed to kill some anvil processes. Run `pkill anvil`.");
    }
}


