import React from "react";
import { useSelector } from "react-redux";
import SortOptions from "../SortOptions";
import styles from "./styles.module.scss";

const SortOptionsPanel = () => {
  const { filteredListings } = useSelector((state) => state.listings);

  return (
    <div className={styles.filtersContainer}>
      <p className={styles.filtersContainerTitle}>Homes for sale in Tampa</p>
      <p className={styles.filtersContainerListingsCount}>
        {filteredListings.length} listings found — Listed on the MLS. Provided
        by Opendoor Brokerage.
      </p>
      <SortOptions />
    </div>
  );
};

export default SortOptionsPanel;
