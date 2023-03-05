import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { MerkleProof } from "../components/MerkleProof";

function generateMerkleProof(address: string) {
  let [leaves, setLeaves] = useState([] as string[]);
  let [calculatingProof, setCalculatingProof] = useState(false);
  let [proof, setProof] = useState({} as MerkleProof);

  // Get the merkle leaves
  useEffect(() => {
    fetch("public/leaves.txt")
      .then((r) => r.text())
      .then((text) => {
        let leaves = text.split(",");
        setLeaves(leaves);
      });
  }, []);

  let loadingComplete = leaves.length > 0;

  // Kick off webworker to calculate proof in background thread
  useEffect(() => {
    if (
      leaves.length > 0 &&
      address !== "" &&
      !calculatingProof &&
      proof.proof === undefined
    ) {
      setCalculatingProof(true);
      let worker = new Worker(new URL("createMerkleProof", import.meta.url));
      worker.postMessage({ address: address, leaves: leaves });
      worker.onmessage = ({ data: { resultProof } }) => {
        setCalculatingProof(false);
        setProof(resultProof);
      };
    }
  }, [leaves, address]);
}

export default function AddressField() {
    // on submit, call the proof generation function
    // and then send the proof to the server
    // to be verified and the eth sent
    // if the proof is valid
    onsubmit = (e) => {
        e.preventDefault();
        const address = e.target.address.value;
        generateMerkleProof(address);
    }
    handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
    return (
    <form onSubmit={handleSubmit}>
      <label>address</label>
      <input type="text" id="address" name="address" />
      <button type="submit">Submit</button>
    </form>
  );
}
