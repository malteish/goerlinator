import styles from "../styles/Home.module.css";
import React from "react";
import Form from "../components/ProofGenerator";
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Goerlinator denied your claim.</h1>
        <br />
        <div className={styles.description2}>
          address hasn’t owned any POAPs until 28 February, 2023 and is not
          eligible to claim GoerliETH.
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Form />
      </main>
    </div>
  );
};

export default Home;
