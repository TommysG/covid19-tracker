import { RiVirusLine } from "react-icons/ri";
import styles from "../styles/DetailsItem.module.css";

function DetailsItem({ icon, title, number, color }) {
  return (
    <div className={styles.container}>
      {icon}

      <div className={styles.details}>
        <span>{title}</span>
        <h1 style={{ color: color }}>{number}</h1>
      </div>
    </div>
  );
}

export default DetailsItem;
