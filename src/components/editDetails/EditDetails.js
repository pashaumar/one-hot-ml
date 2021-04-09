import React, { useState, useEffect } from "react";
import styles from "./EditDetails.module.css";
import { useHistory } from "react-router-dom";
function EditDetails() {
  const history = useHistory();
  let editedDetails = JSON.parse(localStorage.getItem("editedDetails"));

  const requiredCountryDetails = JSON.parse(
    localStorage.getItem("editCountryDetails")
  );
  const countryName = localStorage.getItem("countryName");
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);
  const [name, setName] = useState(requiredCountryDetails.name);
  const [capital, setCapital] = useState(requiredCountryDetails.capital);
  const [calling_code, setCalling_code] = useState(
    requiredCountryDetails.calling_code
  );
  const [currency, setCurrency] = useState(requiredCountryDetails.currency);
  const [population_estimate, setPopulation_estimate] = useState(
    requiredCountryDetails.population_estimate
  );
  const [area, setArea] = useState(requiredCountryDetails.area);
  useEffect(() => {
    if (requiredCountryDetails.name === undefined) {
      const path = "/";
      history.push(path);
    }
  }, []);
  const handleCancelButton = () => {
    const path = "country";
    history.push(path);
  };
  const handleSaveChanges = () => {
    if (
      name === "" ||
      capital === "" ||
      calling_code === "" ||
      currency === "" ||
      population_estimate === "" ||
      area === ""
    ) {
      setIsFieldsEmpty(true);
      return;
    }
    editedDetails = {
      ...editedDetails,
      [countryName]: {
        editedName: countryName,
        name: name,
        capital: capital,
        calling_code: calling_code,
        currency: currency,
        population_estimate: population_estimate,
        area: area,
        flag_img: requiredCountryDetails.flag_img,
        location_img: requiredCountryDetails.location_img,
      },
    };

    localStorage.setItem("editedDetails", JSON.stringify(editedDetails));
    const path = "/";
    history.push(path);
  };
  return (
    <div className={styles.editDetailsContainer}>
      <h1>Edit Details Here</h1>
      <div className={styles.editDetails}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capital"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Code"
          value={calling_code}
          onChange={(e) => setCalling_code(e.target.value)}
        />
        <input
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
        <input
          type="text"
          placeholder="Population"
          value={population_estimate}
          onChange={(e) => setPopulation_estimate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Land Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      {isFieldsEmpty && (
        <div className={styles.error}>Above Fields Cannot Be Empty </div>
      )}
      <div className={styles.buttons}>
        <button onClick={handleCancelButton}>Cancel</button>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default EditDetails;
