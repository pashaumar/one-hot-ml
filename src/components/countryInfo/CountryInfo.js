import React, { useState, useEffect } from "react";
import styles from "./CountryInfo.module.css";
import { useHistory } from "react-router-dom";
function CountryInfo() {
  const countryName = localStorage.getItem("countryName");
  const editedDetails = JSON.parse(localStorage.getItem("editedDetails"));
  const [countryDetails, setCountryDetails] = useState({});
  const history = useHistory();

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
        const requiredCountryDetails = {
          name: data.name,
          capital: data.capital,
          calling_code: data.calling_code,
          currency: data.currency,
          population_estimate: data.population_estimate,
          area: data.area,
          flag_img: data.flag_img,
          location_img: data.location_img,
        };

        localStorage.setItem(
          "editCountryDetails",
          JSON.stringify(requiredCountryDetails)
        );

        setCountryDetails((prevDetails) => {
          return {
            ...prevDetails,
            ...data,
          };
        });
      });
  }, [countryName]);

  const handleEditClick = () => {
    const path = "edit-details";
    history.push(path);
  };
  const showCountryDetails = (countryDetails) => {
    if (countryDetails.name === undefined) {
      return <p>Loading...</p>;
    }
    return (
      <div className={styles.infoWrapper}>
        <div className={styles.flagContainer}>
          <img src={countryDetails.location_img} alt="" />
          <img src={countryDetails.flag_img} alt="" />
        </div>
        <div className={styles.infoContainer}>
          <p>
            <span>Capital:</span> {countryDetails.capital}
          </p>
          <p>
            <span>Phone Code:</span> {countryDetails.calling_code}
          </p>
          <p>
            <span>Currency:</span> {countryDetails.currency}
          </p>
          <p>
            <span>Population:</span> {countryDetails.population_estimate}
          </p>
          <p>
            <span>Land Area:</span> {countryDetails.area}
          </p>
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.countryDetailsContainer}>
      <h1 className={styles.heading}>{countryName}</h1>
      {editedDetails === null
        ? showCountryDetails(countryDetails)
        : editedDetails[countryName] !== undefined &&
          editedDetails[countryName].editedName === countryName
        ? showCountryDetails(editedDetails[countryName])
        : showCountryDetails(countryDetails)}
    </div>
  );
}

export default CountryInfo;
