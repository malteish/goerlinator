import styles from "../styles/Home.module.css";
import React from "react";
import Form from "../components/Form.tsx";
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>This address already got their share.</h1>
        <br />
        <div className={styles.description2}>
          has already claimed GoerliETH and is not eligible for another claim.
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
