import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import Head from "next/head";
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
  // const router = useRouter();

  // Change eligible addresses to the list we use

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const address = event.target.address.value;
  //   const response = await fetch('/api/eligible-addresses');
  //   const eligibleAddresses = await response.json();

  //   if (eligibleAddresses.includes(address)) {
  //     router.push('/Claimed');
  //   }
  //   else if (eligibleAddresses.includes(address) {
  //     router.push('/Claimed_Before');
  //   }
  //   else {
  //     router.push('/Declined');
  //   }
  // }

  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

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
        {/* <ConnectButton /> */}
        <div className={styles.box}>
          Addresses that had at least one POAP until February 28, 2023 are
          eligible for a one-time 1 GoerliETH claim.
        </div>
        {loading && <div>Loading ...</div>}
        <div className={styles.flexBox}>
          <div className={styles.description2}>Claim with address:</div>
          <div className={styles.inputContainer}>
            <label>address: </label>
            <input type="text" id="address" name="address" ref={inputRef} />
            <button
              className={styles.formButton}
              type="submit"
              disabled={loading || (inputRef.current as any)?.value === ""}
              onClick={async () => {
                setLoading(true);
                try {
                  const response = await fetch("/api/claim", {
                    method: "POST",
                    body: JSON.stringify({
                      address: (inputRef.current as any)?.value,
                    }),
                  });
                  const resJson = await response.json();
                  console.log(resJson);
                  if (resJson.error) {
                    throw new Error(resJson.error);
                  }
                  Router.push("/Claimed");
                } catch (e) {
                  console.error(e);
                  Router.push("/Declined");
                } finally {
                  setLoading(false);
                }
              }}
            >
              Claim
            </button>
          </div>
          {/* <form action="/api/claim" method="post">
          <div className={styles.inputContainer}>
          <label>address:  </label>
          <input type="text" id="address" name="address" />
          <button className={styles.formButton} type="submit">Claim</button>
          </div>
        </form> */}
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
