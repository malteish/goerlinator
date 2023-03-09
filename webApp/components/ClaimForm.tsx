import React from "react";
import Router from "next/router";
import styles from "../styles/Home.module.css";

export default function ClaimForm() {
  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  return (
    <div>
      <div className={styles.description2}>Claim with address (not ENS):</div>
      <div className={styles.loading}>{message != "" && message}</div>
      <div className={styles.inputContainer}>
        <input type="text" id="address" name="address" ref={inputRef} />
        <button
          className={styles.formButton}
          type="submit"
          disabled={loading || (inputRef.current as any)?.value === ""}
          onClick={async () => {
            setMessage("Loading ... (might take a while)");
            try {
              const response = await fetch("/api/claim", {
                method: "POST",
                body: JSON.stringify({
                  address: (inputRef.current as any)?.value,
                }),
              });

              const responseJson = await response.json();
              console.log("responseJson: ", responseJson);

              if (response.status === 500) {
                throw new Error(await response.json());
              }

              // all other status codes should come with a data object
              const responseMessage = responseJson.data;
              console.log("response message: ", responseMessage);
              setMessage(responseMessage);

              // if (response.status == 200 && responseJson.txHash != null) {
              //   const txHash = responseJson.txHash;
              //   console.log("txHash: ", txHash);
              //   setMessage("Address is being goerlinated: " + txHash);
              //   //throw new Error("Something went wrong");
              // } else {

              // }

              // todo: check the response status and choose an appropriate color for the message!
              // if (response.status === 200) {
              // } else if (response.status === 400) {
              // } else if (response.status === 500) {
            } catch (e) {
              console.error(e);
              Router.push("/error");
            } finally {
              setLoading(false);
            }
          }}
        >
          Claim
        </button>
      </div>
    </div>
  );
}
