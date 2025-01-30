import React from "react";
import SortOptionsPanel from "../SortOptionsPanel";
import styles from "./styles.module.scss";

const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.sortOptionsPanelContainer}>
        <SortOptionsPanel />
      </div>
      <img className={styles.map} src="/map.png" alt="Static Map" />
    </div>
  );
};

export default Map;
