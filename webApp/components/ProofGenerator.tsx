import React from "react";
import Router from "next/router";
import styles from "../styles/Home.module.css";

export default function ProofGenerator() {
  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  // let [leaves, setLeaves] = useState([] as string[]);

  const checkAndGenerateProof = async (address: string) => {
    setLoading(true);
    try {
      // // Get the merkle leaves
      // useEffect(() => {
      //   fetch(CurrentConfig.MerkleTreePath)
      //     .then((r) => r.text())
      //     .then((text) => {
      //       let leaves = text.split(",");
      //       setLeaves(leaves);
      //     });
      // }, []);

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
