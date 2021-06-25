import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Header from "../../components/Header";
import Map from "../../components/Map";
import DetailsItem from "../../components/DetailsItem";
import CardCase from "../../components/CardCase";
import CardStats from "../../components/CardStats";
import { Container } from "@material-ui/core";
import Table from "../../components/Table";
import { numberWithCommas } from "../../utils/functions";

// DETAILS ITEM ICONS IMPORTS
import { RiVirusFill } from "react-icons/ri";
import {
  GiVirus,
  GiMedicinePills,
  GiDeathSkull,
  GiMedicalThermometer,
} from "react-icons/gi";

function Country({ data, countries, all }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid19 {router.query.id}</title>
        <meta
          name="description"
          content="Tracking Covid19 cases all over the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <Header />

      {/* OVERVIEW */}
      <div className={styles.overview}>
        <Map lat={data.countryInfo.lat} long={data.countryInfo.long} />
        <div className={styles.details}>
          {/* Country selected */}
          <div className={styles.country}>
            <Image
              src={data.countryInfo.flag}
              width={50}
              height={33.4}
              alt="flag"
              priority
            />
            <h2>{data.country}</h2>
          </div>
          <DetailsItem
            title="Total Cases"
            number={numberWithCommas(data.cases)}
            icon={<RiVirusFill className={styles.icon} size={50} />}
          />
          <DetailsItem
            title="Infected now"
            number={numberWithCommas(data.active)}
            icon={<GiMedicalThermometer className={styles.icon} size={50} />}
          />
          <DetailsItem
            title="Recovered"
            number={numberWithCommas(data.recovered)}
            color="#2dd164"
            icon={<GiMedicinePills className={styles.icon} size={50} />}
          />
          <DetailsItem
            title="Deaths"
            number={numberWithCommas(data.deaths)}
            color="#F1C23E"
            icon={<GiDeathSkull className={styles.icon} size={50} />}
          />
        </div>
      </div>

      {/* CONTENT DETAILS */}

      <Container maxWidth="xl">
        <div className={styles.content}>
          <CardCase
            first={numberWithCommas(all.active)}
            second={
              numberWithCommas(all.active - all.critical) +
              "(" +
              (((all.active - all.critical) * 100) / all.active).toFixed(1) +
              "%)"
            }
            third={
              numberWithCommas(all.critical) +
              "(" +
              ((all.critical * 100) / all.active).toFixed(1) +
              "%)"
            }
          />
          <CardCase
            title="CLOSED CASES"
            firstDesc="Cases which had an outcome"
            secondDesc="Recovered / Discharged"
            thirdDesc="Deaths"
            first={numberWithCommas(all.recovered + all.deaths)}
            second={
              numberWithCommas(all.recovered) +
              "(" +
              ((all.recovered * 100) / (all.recovered + all.deaths)).toFixed(
                1
              ) +
              "%)"
            }
            third={
              numberWithCommas(all.deaths) +
              "(" +
              ((all.deaths * 100) / (all.recovered + all.deaths)).toFixed(1) +
              "%)"
            }
          />
          <CardStats
            total={all.todayCases}
            active={all.todayCases - all.todayRecovered - all.todayDeaths}
            recovered={all.todayRecovered}
            deaths={all.todayDeaths}
          />
          <CardStats
            title="WORLDWIDE STATISTICS"
            total={all.cases}
            active={all.active}
            recovered={all.recovered}
            deaths={all.deaths}
          />
        </div>

        <div style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }}>
          <Table countries={countries} />
        </div>
      </Container>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  // const res = await fetch(
  //   `https://disease.sh/v3/covid-19/countries/${context.params.id}`
  // );
  // const data = await res.json();

  const [dataRes, countriesRes, allRes] = await Promise.all([
    fetch(`https://disease.sh/v3/covid-19/countries/${context.params.id}`),
    fetch(`https://disease.sh/v3/covid-19/countries/`),
    fetch(`https://disease.sh/v3/covid-19/all`),
  ]);
  let [data, countries, all] = await Promise.all([
    dataRes.json(),
    countriesRes.json(),
    allRes.json(),
  ]);

  // if (data.message) {
  //   const res = await fetch(`https://disease.sh/v3/covid-19/countries/USA`);
  //   data = await res.json();
  // }

  const check = data.message
    ? { permanent: false, destination: `/country/US` }
    : "";

  if (!data || !countries || !all) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, countries, all },
    redirect: check,
  };
};

export default Country;
