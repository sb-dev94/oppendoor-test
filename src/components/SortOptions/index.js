import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setListingStatus } from "../../store/slices/listingsSlice";
import SelectBox from "../SelectBox";
import styles from "./styles.module.scss";

const sortingOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const filteringOptions = [
  { label: "All", value: "all" },
  { label: "Sold", value: "sold" },
  { label: "Active", value: "active" },
];

const SortOptions = () => {
  const { sortBy, listingStatus } = useSelector(
    (state) => state.listings.filter
  );
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  const handleListingStatusChange = (value) => {
    dispatch(setListingStatus(value));
  };

  return (
    <div className={styles.filtersContainer}>
      <div>
        <SelectBox
          options={sortingOptions}
          selectedValue={sortBy}
          onSelect={handleSortChange}
        />
      </div>
      <div>
        <SelectBox
          options={filteringOptions}
          selectedValue={listingStatus}
          onSelect={handleListingStatusChange}
        />
      </div>
    </div>
  );
};

export default SortOptions;
