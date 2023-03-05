import styles from "../styles/Home.module.css";
import React from "react";
import Form from "../components/Form";
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Goerlinator denied your claim.</h1>
        <br />
        <div className={styles.description2}>
          The address is not on the list or it has already claimed.
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <Form /> */}
      </main>
    </div>
  );
};

export default Home;
