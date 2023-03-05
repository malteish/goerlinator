import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>There is an error, human.</h1>
        <br />
        <div className={styles.description2}>
          Goerlinator could not consider your address status right now.
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className={styles.description2}>Check back later.</div>
      </main>
    </div>
  );
};

export default Home;
