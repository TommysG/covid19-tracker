import styles from "../styles/Card.module.css";
import { IoIosStats } from "react-icons/io";

function CardCase({
  title = "ACTIVE CASES",
  firstDesc = "Currently infected patients",
  secondDesc = "In mild condition",
  thirdDesc = "Serious / Critical",
  first,
  second,
  third,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <IoIosStats size={20} fill="#666666" />
      </div>

      <div className={styles.content}>
        <div className={styles.firstRow}>
          <div>
            <h2>{first}</h2>
            <span>{firstDesc}</span>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div>
            <h2 style={{ color: "#8381ED" }}>{second}</h2>
            <span>{secondDesc}</span>
          </div>

          <div>
            <h2 style={{ color: "#F2C041" }}>{third}</h2>
            <span>{thirdDesc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCase;
