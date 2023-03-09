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
      <div className={styles.loading}>{message !== "" && message}</div>
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

              if (response.status === 500) {
                throw new Error(await response.json());
              }

              const responseJson = await response.json();
              console.log("responseJson: ", responseJson);
              const responseMessage = responseJson.data;
              console.log("response message: ", responseMessage);
              setMessage(responseMessage);

              // todo: check the response status and choose an appropriate color for the message!
              // if (response.status === 200) {
              //   Router.push("claimed");
              // } else if (response.status === 400) {
              //   setMessage(responseMessage);
              //   // if response.json() {
              //   //   setMessage(JSON.stringify(response.json()));
              //   // }
              //   //setMessage(JSON.stringify(responeJson);
              // } else if (response.status === 500) {
              //   Router.push("error");
              // } else {
              //   Router.push("considered");
              // }
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
