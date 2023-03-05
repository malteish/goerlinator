import React from "react";
import Router from "next/router";
import styles from "../styles/Home.module.css";

export default function ProofGenerator() {
  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [downloading, setDownloading] = React.useState(true);
  let [leaves, setLeaves] = React.useState([] as string[]);

  // Get the merkle leaves
  React.useEffect(() => {
    fetch("leaves.txt")
      .then((r) => r.text())
      .then((text) => {
        let leaves = text.split(",");
        setLeaves(leaves);
      });
  }, []);

  const checkAndGenerateProof = async (address: string) => {
    setLoading(true);
    try {
      // const pipeline = promisify(stream.pipeline);
      // const { filename } = req.query;

      // Download the file from the server
      // const url = `leaves.txt`;
      // const fileRes = await fetch(url);

      // if (!fileRes.ok) {
      //   throw new Error(`unexpected response ${fileRes.statusText}`);
      // }

      // console.log("File downloaded: ", fileRes);
      // if (fileRes.body === null) {
      //   throw new Error(`File body is null`);
      // }
      // let leaves = fileRes.body.toString().split(",");

      while (leaves.length === 0) {
        console.log("Waiting for leaves to load");
        await new Promise((resolve) => setTimeout(resolve, 10));
        console.log("Waiting for leaves to load");
      }
      console.log("Loaded file: ", leaves.length, " addresses.");
      if (!leaves.includes(address)) {
        throw new Error(`Address not found in merkle tree`);
      }

      console.log("Leaves loaded, starting proof generation");

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
  };

  return (
    <div>
      <div className={styles.description2}>Claim with address:</div>
      <div className={styles.loading}>
        {loading && <div>Loading ... (it might take a minute)</div>}
      </div>
      <div className={styles.inputContainer}>
        <label>address: </label>
        <input type="text" id="address" name="address" ref={inputRef} />
        <button
          className={styles.formButton}
          type="submit"
          disabled={loading || (inputRef.current as any)?.value === ""}
          onClick={() =>
            checkAndGenerateProof((inputRef.current as any)?.value)
          }
        >
          Claim
        </button>
      </div>
    </div>
  );
}
