import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link"
import type { NextPage } from "next";
// import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
    return (
		<div className={styles.container}>
			<main className={styles.main}>
            <h1 className={styles.title}>
            Congrats, human.
            </h1>
            <br />
			<div className={styles.description2}>Goerlinator sent 50 GoerliETH to the address provided.
            <br/>
            You can check your transaction{" "}
            <a href="https://goerli.etherscan.io/tx/0x95e6231ef7b399a0d549880568b16f3c0eb2b0c50ab03e38490df86131adad1e"
            rel="noopener noreferrer"
            target="_blank">
            here.
            </a>
            </div>
			<br />
			<br />
			<br />
			<div className={styles.description2}>Goerlinator would be happy if you shared the information about him with 
your friends.
<br/>
Hasta la vista, dev!
</div>
        </main>
        </div>
       
    );
};

export default Home;