import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Congrats, human.</h1>
        <br />
        <div className={styles.description2}>
          Goerlinator considers your addresses status.
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className={styles.description2}>
          Check your address on{" "}
          <Link href="https://goerli.etherscan.io/">
            <a>etherscan</a>
          </Link>{" "}
          to know if you received goerli eth!
          <br />
          Hasta la vista, dev!
        </div>
      </main>
    </div>
  );
};

export default Home;
