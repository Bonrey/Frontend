import React from 'react';
import styles from './Attribution.module.scss';

export default function Attribution() {
  return (
    <footer>
      <p>Challenge by <a
        className={styles.Website} 
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noopener noreferrer"
      >Frontend Mentor</a>.</p>
      <p>Created by <a
        className={styles.Author}
        href="https://github.com/Bonrey/Frontend/tree/main/React/intro-component-with-signup-form"
        target="_blank"
        rel="noopener noreferrer"
      >Bonrey</a>.</p>
    </footer>
  );
}