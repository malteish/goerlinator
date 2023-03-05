// import { useState } from 'react';
import styles from "../styles/Home.module.css";

export default function Form() {
return (
<form action="/api/claim" method="post">
          <div className={styles.inputContainer}>
          <label>address:  </label>
          <input type="text" id="address" name="address" />
          <button className={styles.formButton} type="submit">Claim</button>
          </div>
        </form>
)
}