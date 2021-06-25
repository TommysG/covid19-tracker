import styles from "../styles/Search.module.css";
import { IoSearch, IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";
import CountryItem from "./CountryItem";

function Search() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const ref = useRef();
  const router = useRouter();

  const fetchCountries = async () => {
    const res = await fetch(`https://disease.sh/v3/covid-19/countries`);
    const data = await res.json();

    setResults(data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const selectCountry = () => {
    setOpen(false);
    ref.current.value = "";
    setText("");
  };

  const filteredCountries = results.filter(
    (country) =>
      country.country.toLowerCase().includes(text.toLowerCase()) || !text
  );

  return (
    <div className={styles.searchBox}>
      <button
        className={styles.btnSearch}
        onClick={() => {
          if (!expanded) {
            setExpanded(true);
          } else {
            setExpanded(false);
            setOpen(false);
            setText("");
            ref.current.value = "";
          }
        }}
      >
        {!expanded ? <IoSearch /> : <IoClose />}
      </button>
      <input
        type="text"
        autoComplete="off"
        ref={ref}
        className={
          expanded
            ? `${styles.inputSearch} ${styles.open}`
            : `${styles.inputSearch}`
        }
        placeholder="Search country"
        onChange={(event) => {
          setText(event.target.value);

          if (event.target.value.length > 0) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
      />
      <div
        className={styles.results}
        style={open ? { height: 250 } : { height: 0 }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => {
            if (text.length > 0 && country.countryInfo._id !== null) {
              return (
                <CountryItem
                  key={`${country.countryInfo._id}-${country.countryInfo.lat}-${country.countryInfo.long}`}
                  id={`${country.countryInfo._id}-${country.countryInfo.lat}-${country.countryInfo.long}`}
                  onClick={selectCountry}
                  img={country.countryInfo.flag}
                  name={country.country}
                  slug={country.countryInfo.iso2}
                />
              );
            }
          })
        ) : (
          <div className={styles.noResults}>
            <Image
              src="/assets/search_icon.png"
              alt="search"
              width={80}
              height={77}
              priority
            />
            <span className={styles.sorry}>
              Sorry we couldn't find any matches for <span>{text}</span>
            </span>
            <span className={styles.try}>
              Please try searching for another country.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
