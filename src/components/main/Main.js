import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import ReactTooltip from "react-tooltip";
import Map from "../map/Map";
function Main() {
  const editedDetails = JSON.parse(localStorage.getItem("editedDetails"));
  const countryName = localStorage.getItem("countryName");
  const [countryDetails, setCountryDetails] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  const showTooltipData = (details) => {
    if (details.capital === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className={styles.flagContainer}>
          <img src={details.flag_img} />
        </div>
        <div>{`${details.name}`}</div>
        <div>{`${details.capital}`}</div>
        <div>{` ${details.calling_code}`}</div>
        <div>{`${details.currency}`}</div>
        <div>{`${details.population_estimate}`}</div>
        <div>{`${details.area}`}</div>
      </>
    );
  };

  return (
    <div>
      <Map
        setCountryDetails={setCountryDetails}
        setIsFetched={setIsFetched}
        countryDetails={countryDetails}
      />

      {isFetched && (
        <ReactTooltip className={styles.tooltipContainer}>
          {editedDetails === null
            ? showTooltipData(countryDetails)
            : editedDetails[countryName] !== undefined &&
              editedDetails[countryName].editedName === countryName
            ? showTooltipData(editedDetails[countryName])
            : showTooltipData(countryDetails)}
        </ReactTooltip>
      )}
    </div>
  );
}

export default Main;
