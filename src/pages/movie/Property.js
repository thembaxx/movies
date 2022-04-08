import React from "react";
import styles from "./property.module.css";

function Property({ title, content }) {
  return (
    <div className={`${styles.container}`}>
      <span className={`${styles.heading}`}>
        <span className={`${styles.title}`}>{title}</span> {content}
      </span>
    </div>
  );
}

export default Property;
