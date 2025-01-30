import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as MapIcon } from "../../assets/icons/map.svg";
import { ReactComponent as ListIcon } from "../../assets/icons/list.svg";
import { toggleViewMode } from "../../store/slices/uiSlice";
import styles from "./styles.module.scss";

const SwitchModeButton = () => {
  const dispatch = useDispatch();
  const isMapView = useSelector((state) => state.ui.isMapView);

  const handleToggle = () => {
    dispatch(toggleViewMode());
  };

  return (
    <button onClick={handleToggle} className={styles.switchModeButton}>
      {isMapView ? <ListIcon className="" /> : <MapIcon className="" />}
      {isMapView ? "List" : "Map"}
    </button>
  );
};

export default SwitchModeButton;
