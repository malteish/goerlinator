import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";

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
          content="The Goerlinator distributes goerli eth to the masses"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GOERLINATOR</h1>
        <h2 className={styles.description}>
          terminating your GoerliETH shortage
        </h2>
        <img
          className={styles.goerlinator}
          src="/goerlinator_talking.png"
        ></img>
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
          Addresses that had at least one POAP until February 28, 2023 are
          eligible for a one-time 1 GoerliETH claim.
        </div>
        <div className={styles.flexBox}>
          <div className={styles.description2}>Claim with address:</div>
          <Form />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/malteish/goerlinator"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made with ❤️ by M&M
        </a>
      </footer>
    </div>
  );
};

export default Home;
