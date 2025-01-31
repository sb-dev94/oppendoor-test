import React from "react";
import SortOptionsPanel from "../SortOptionsPanel";
import MapBox from "../MapBox";
import styles from "./styles.module.scss";

const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.sortOptionsPanelContainer}>
        <SortOptionsPanel />
      </div>
      <MapBox />
    </div>
  );
};

export default Map;
