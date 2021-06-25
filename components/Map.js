import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
} from "react-simple-maps";
import { useRouter } from "next/router";
import styles from "../styles/Map.module.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const notListed = [
  "TV",
  "TO",
  "TM",
  "KP",
  "TK",
  "PN",
  "PW",
  "NU",
  "NR",
  "KI",
  "CK",
  "AS",
  "AQ",
];

const Map = ({ lat, long }) => {
  const router = useRouter();
  return (
    <div className={styles.container} style={{ flex: 0.65 }}>
      <div className={styles.box}>
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 200,
          }}
          className={styles.map}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#2A69EC"
                    style={style}
                    onClick={() => {
                      if (!notListed.includes(geo.properties.ISO_A2)) {
                        router.push(`/country/${geo.properties.ISO_A2}`);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
          <Marker
            coordinates={[long, lat]}
            fill="#777"
            className={styles.marker}
          >
            <circle r={10} fill="rgba(255,255,255,0.2)" stroke="#fff"></circle>
            <circle r={2} fill="#fff" stroke="#fff" />
          </Marker>
        </ComposableMap>
      </div>
    </div>
  );
};

const style = {
  default: { outline: "none" },
  hover: { outline: "none", fill: "#2764e3" },
  pressed: { outline: "none" },
};

export default Map;
