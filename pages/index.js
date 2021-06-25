import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Map from "../components/Map";
import DetailsItem from "../components/DetailsItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home({ location }) {
  return <div>{/* <Loading /> */}</div>;
}

export async function getServerSideProps({ req, res }) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;

  const resp = await fetch(`${process.env.DOMAIN}/api/ip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip }),
  });
  const location = await resp.json();

  const check =
    location.message === "ip not found"
      ? { permanent: false, destination: `/country/US` }
      : {
          permanent: false,
          destination: `/country/${location.data.countryCode}`,
        };

  if (!location) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: check,
  };
}
