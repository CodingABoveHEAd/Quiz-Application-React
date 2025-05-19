import React from "react";
import "../styles/global.css";
import styles from "../styles/item.module.css";

export default function Item({ name, image, noq }) {
  return (
    <div className={styles.item}>
      <img src={image} alt="logo" />
      <p>
        <b className="link">{name}</b>
      </p>
      <div className={styles.det}>
        <p style={{ top: 20, left: 3 }}>{noq} Questions</p>
        <p style={{ top: 20, right: 3 }}>Total points: {noq * 5}</p>
      </div>
    </div>
  );
}
