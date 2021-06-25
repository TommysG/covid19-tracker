import Head from "next/head";

export default function Home({ location }) {
  return (
    <Head>
      <title>Covid19 tracker</title>
      <meta
        name="description"
        content="Tracking covid19 cases all over the world"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
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
