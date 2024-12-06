import React from "react";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.main}>
      <div></div>
      <nav>
        <ul>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contacts</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
