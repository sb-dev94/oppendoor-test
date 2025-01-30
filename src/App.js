import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Map from "./components/Map";
import ListingPanel from "./components/ListingPanel";
import SwitchModeButton from "./components/SwitchModeButton";
import styles from "./App.module.scss";
import "./styles/main.scss";

function App() {
  const isMapView = useSelector((state) => state.ui.isMapView);
  return (
    <div className="App">
      <Header />
      <div className={styles.mainContainer}>
        <div
          className={`${styles.leftPane} ${
            !isMapView ? styles.hiddenLeftPane : ""
          }`}
        >
          <Map />
        </div>
        <div
          className={`${styles.rightPane} ${
            isMapView ? styles.hiddenRightPane : ""
          }`}
        >
          <ListingPanel />
        </div>
        <SwitchModeButton />
      </div>
    </div>
  );
}

export default App;
