import styles from "../styles/CardStats.module.css";
import { IoIosStats } from "react-icons/io";
import { numberWithCommas } from "../utils/functions";

function CardStats({
  title = "TODAY STATISTICS",
  total,
  recovered,
  active,
  deaths,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <IoIosStats size={20} />
      </div>

      <div className={styles.content}>
        <div className={styles.firstRow}>
          <div>
            <h2>{numberWithCommas(total)}</h2>
            <span>Total cases</span>
          </div>

          <div>
            <h2 style={{ color: "#2dd164" }}>{numberWithCommas(recovered)}</h2>
            <span>Recovered</span>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div>
            <h2>{numberWithCommas(active)}</h2>
            <span>Infected now</span>
          </div>

          <div>
            <h2 style={{ color: "#F2C041" }}>{numberWithCommas(deaths)}</h2>
            <span>Deaths</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardStats;
