import React from 'react';
import styles from "./Introduction.module.scss";

const Introduction = () => {
  return (
    <div className={styles.Wrapper}>
      <h1>Learn to code by watching others</h1>
      <p>See how experienced developers solve problems in real-time. Watching scripted tutorials is great, 
  but understanding how developers think is invaluable.</p>
    </div>
  );
}

export default Introduction;