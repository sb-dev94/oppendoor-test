import React from "react";
import SearchBar from "../SearchBar";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as LogoMobile } from "../../assets/icons/logo-mobile.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.logoMobile}>
          <LogoMobile />
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <ul className={styles.linksList}>
          <li>
            <a className={styles.link} href="/">
              Also selling?
            </a>
          </li>
          <li>
            <a className={styles.link} href="/">
              More
            </a>
          </li>
          <li>
            <a className={styles.linkPrimary} href="/">
              Sign in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
