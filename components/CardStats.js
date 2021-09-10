import styles from "../styles/CardStats.module.css";
import { IoIosStats } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { numberWithCommas } from "../utils/functions";
import { useState } from "react";
import Image from "next/image";

function CardStats({
  title = "TODAY STATISTICS",
  total = 20,
  recovered = 20,
  active = 20,
  deaths = 20,
  world,
  domestic,
  button = true,
}) {
  const [global, setGlobal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          {button
            ? global
              ? "WORLDWIDE " + title
              : domestic.country.toUpperCase() + " " + title
            : title}
        </h3>
        <div className={styles.iconBox}>
          {button && (
            <IoEarth
              size={20}
              style={
                global
                  ? { marginRight: 5, cursor: "pointer", color: "#F2C041" }
                  : { marginRight: 5, cursor: "pointer" }
              }
              onClick={() => setGlobal(!global)}
            />
          )}

          <IoIosStats size={20} />
        </div>
      </div>

      {button ? (
        <div className={styles.slider}>
          <div
            className={
              global
                ? `${styles.content} ${styles.hidden}`
                : `${styles.content} ${styles.visible} `
            }
          >
            <div className={styles.firstRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(domestic.todayCases)}</h2>
                <span>Total cases</span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#2dd164" }}>
                  {numberWithCommas(domestic.todayRecovered)}
                </h2>
                <span>Recovered</span>
              </div>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(domestic.critical)}</h2>
                <span>Critical/Serious </span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#F2C041" }}>
                  {numberWithCommas(domestic.todayDeaths)}
                </h2>
                <span>Deaths</span>
              </div>
            </div>
          </div>

          <div
            className={styles.content}
            style={
              !global
                ? {
                    transform: "translate(100%)",
                    width: "100%",
                  }
                : { width: "100%" }
            }
          >
            <div className={styles.firstRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(world.todayCases)}</h2>
                <span>Total cases</span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#2dd164" }}>
                  {numberWithCommas(world.todayRecovered)}
                </h2>
                <span>Recovered</span>
              </div>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(world.critical)}</h2>
                <span>Critical/Serious </span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#F2C041" }}>
                  {numberWithCommas(world.todayDeaths)}
                </h2>
                <span>Deaths</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.content}>
            <div className={styles.firstRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(world.cases)}</h2>
                <span>Total cases </span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#2dd164" }}>
                  {numberWithCommas(world.recovered)}
                </h2>
                <span>Recovered</span>
              </div>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.statsBox}>
                <h2>{numberWithCommas(world.active)}</h2>
                <span>Infected now </span>
              </div>

              <div className={styles.statsBox}>
                <h2 style={{ color: "#F2C041" }}>
                  {numberWithCommas(world.deaths)}
                </h2>
                <span>Deaths</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardStats;
