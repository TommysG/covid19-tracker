import Link from "next/link";
import styles from "../styles/CountryItem.module.css";
import Image from "next/image";

function CountryItem({ id, img, name, slug, onClick }) {
  return (
    <Link key={id} href={`/country/${slug}`}>
      <div className={styles.container} onClick={onClick}>
        <Image width={40} height={26} src={img} alt="flag" priority />
        <a>{name}</a>
      </div>
    </Link>
  );
}

export default CountryItem;
