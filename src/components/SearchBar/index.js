import { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { setSearchQuery } from "../../store/slices/listingsSlice";
import styles from "./styles.module.scss";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();

  const onSearchValueCange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <div
        className={`${styles.inputWrapper} ${focused ? styles.focused : ""}`}
      >
        <SearchIcon className={styles.icon} />
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          onChange={onSearchValueCange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div
        className={`${styles.underline} ${focused ? styles.active : ""}`}
      ></div>
    </div>
  );
}
