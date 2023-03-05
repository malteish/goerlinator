import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import ProofGenerator from "../components/ProofGenerator";
import styles from "../styles/Home.module.css";
import { MerkleProof } from "../components/MerkleProof";

// function generateMerkleProof(address: string) {
//   let [leaves, setLeaves] = useState([] as string[]);
//   let [calculatingProof, setCalculatingProof] = useState(false);
//   let [proof, setProof] = useState({} as MerkleProof);

//   // Get the merkle leaves
//   useEffect(() => {
//     fetch("public/leaves.txt")
//       .then((r) => r.text())
//       .then((text) => {
//         let leaves = text.split(",");
//         setLeaves(leaves);
//       });
//   }, []);

//   let loadingComplete = leaves.length > 0;

//   // Kick off webworker to calculate proof in background thread
//   useEffect(() => {
//     if (
//       leaves.length > 0 &&
//       address !== "" &&
//       !calculatingProof &&
//       proof.proof === undefined
//     ) {
//       setCalculatingProof(true);
//       let worker = new Worker(new URL("createMerkleProof", import.meta.url));
//       worker.postMessage({ address: address, leaves: leaves });
//       worker.onmessage = ({ data: { resultProof } }) => {
//         setCalculatingProof(false);
//         setProof(resultProof);
//       };
//     }
//   }, [leaves, address]);
// }

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Goerlinator</title>
        <meta
          content="The Goerlinator distributes GoerliETH to the masses"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GOERLINATOR</h1>
        <h2 className={styles.description}>
          terminating your GoerliETH shortage
        </h2>
        <Image
          src="/goerlinator_talking.png"
          alt="Goerlinator"
          width={600}
          height={300}
        />
        {/* <ConnectButton /> */}
        <div className={styles.box}>
          Addresses that had at least one POAP before March 1, 2023 are eligible
          for a one-time 50 GoerliETH claim.
        </div>
        <div className={styles.flexBox}>
          <ProofGenerator />
        </div>
      </main>

      <footer className={styles.footer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="https://github.com/malteish/goerlinator">
            <a>
              <Image
                src="/github-logo-white.png"
                alt="github-logo"
                width="50"
                height="50"
              />
            </a>
          </Link>
        </div>
        <div className={styles.container}>
          GoerliETH funded by:{" "}
          <a
            href="https://twitter.com/MPtherealmvp"
            rel="noopener noreferrer"
            target="_blank"
          >
            Maria Paula
          </a>
          <br />
          Project created by:{" "}
          <a
            href="https://twitter.com/malteish"
            rel="noopener noreferrer"
            target="_blank"
          >
            Malteish
          </a>
          &
          <a
            href="https://twitter.com/MacBudkowski"
            rel="noopener noreferrer"
            target="_blank"
          >
            Mac
          </a>
          <br />
          Inspired by:{" "}
          <a
            href="https://grabteeth.xyz/"
            rel="noopener noreferrer"
            target="_blank"
          >
            grabteeth
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
