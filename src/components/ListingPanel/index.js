import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SortOptionsPanel from "../SortOptionsPanel";
import ListingCard from "../ListingCard";
import { fetchListings } from "../../store/slices/listingsSlice";
import styles from "./styles.module.scss";

const ListingPanel = () => {
  const dispatch = useDispatch();
  const { filteredListings, status, error } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (status === "loading") {
    return <></>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SortOptionsPanel />
      <div className={styles.listingCardsContainer}>
        {filteredListings.map((listing, index) => (
          <React.Fragment key={listing._id}>
            <ListingCard listing={listing} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListingPanel;
