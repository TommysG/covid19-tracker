import styles from "../styles/Header.module.css";
import { RiVirusFill } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import Search from "../components/Search";
import { useState } from "react";

export default function Header() {
  return (
    <div className={styles.container}>
      {/* LOGO */}
      <div className={styles.logo}>
        <RiVirusFill size={40} />
        <h5>CORONAVIRUS</h5>
      </div>

      {/* PROTECTION METHODS */}
      <div className={styles.protect}>
        <Search />

        <div className={styles.video}>
          <a
            href="https://www.youtube.com/watch?v=FC4soCjxSOQ"
            style={{ display: "flex", alignItems: "center" }}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillPlayCircle size={25} />
            <span>How to protect yourself</span>
          </a>

          {/* SICK? */}
          <a
            href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
            target="_blank"
            rel="noreferrer"
            className={styles.sickBtn}
          >
            Are you sick?
          </a>
        </div>
      </div>
    </div>
  );
}
