import React from "react";
import styles from "./styles.module.css";

const Card = ({ title, isDone, id, onClick, onCardDeleted }) => {
  return (
    <div className={styles.main} onClick={() => onClick(id)}>
      <h3>{title}</h3>
      <div
        className={`${styles.status} ${isDone ? styles.done : styles.notDone}`}
      ></div>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          onCardDeleted(id);
          e.stopPropagation();
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Card;
