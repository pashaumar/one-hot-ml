import React, { memo, useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useHistory } from "react-router-dom";

const MapChart = ({ setCountryDetails, setIsFetched, countryDetails }) => {
  const editedDetails = JSON.parse(localStorage.getItem("editedDetails"));
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    if (editedDetails !== null && editedDetails[countryName] !== undefined) {
      if (editedDetails[countryName].editedName === countryName) {
        return;
      }
    }
    fetch(
      `https://wikiapi.p.rapidapi.com/api/v1/wiki/geography/country/info/${countryName.toLowerCase()}?lan=en`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "f633644e39msh8be0d67294be992p13bf3fjsn8e1648232fa2",
          "x-rapidapi-host": "wikiapi.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCountryDetails((prevDetails) => {
          return {
            ...prevDetails,
            ...data,
          };
        });
      });
  }, [countryName]);

  const history = useHistory();
  const handleCountryClick = () => {
    const path = "country";
    history.push(path);
  };
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  return (
    <>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseMove={() => {
                  localStorage.setItem("countryName", countryName);
                  setCountryName(geo.properties.NAME);
                  setIsFetched(true);
                }}
                onMouseLeave={() => {
                  setCountryDetails({});
                  setIsFetched(false);
                }}
                onClick={handleCountryClick}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none",
                    cursor: "pointer",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
