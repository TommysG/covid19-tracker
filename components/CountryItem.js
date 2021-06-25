import Link from "next/link";
import styles from "../styles/CountryItem.module.css";
import Image from "next/image";

function CountryItem({ id, img, name, slug, onClick, query }) {
  return (
    <Link key={id} href={`/country/${slug}`}>
      <div className={styles.container} onClick={onClick}>
        <Image width={40} height={26} src={img} alt="flag" priority />
        <a>
          <span className={styles.highlighting}>
            {name.slice(0, query.length)}
          </span>
          {name.slice(query.length, name.length)}
        </a>
      </div>
    </Link>
  );
}

export default CountryItem;
