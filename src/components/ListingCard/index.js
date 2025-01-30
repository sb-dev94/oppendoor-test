import React from "react";
import styles from "./styles.module.scss";
import { ReactComponent as FavouriteIcon } from "../../assets/icons/favourite.svg";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo-mobile.svg";

const ListingCard = ({ listing }) => {
  const formatNumber = (number = 0) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const getAddressLines = (address) => {
    let [first, ...rest] = address.split(",");
    return {
      firstAddressLine: first,
      secondAddressLine: rest.join(" "),
    };
  };

  return (
    <div className={styles.listingCard}>
      <div className={styles.listingCardImgContainer}>
        <img
          className={styles.listingCardImg}
          src="/flat.webp"
          alt="Property"
        />
        <button className={styles.listingCardFavourite}>
          <FavouriteIcon />
        </button>
        <div className={styles.listingCardTour}>
          <LogoIcon /> Self-Tour
        </div>
      </div>

      <div className={styles.listingCardDetails}>
        <span className={styles.listingCardPrice}>
          ${formatNumber(listing.userData.askingPrice)}
        </span>
        <span className={styles.listingCardLineItem}>
          {listing.zillowData ? listing.zillowData.bedrooms : "0"}bd{" "}
          {listing.zillowData ? listing.zillowData.bathrooms : "0"}ba{" "}
          {listing.zillowData
            ? formatNumber(listing.zillowData.livingAreaValue)
            : "0"}{" "}
          sqft<sup>2</sup>
        </span>
        <span className={styles.listingCardLineItem}>
          {getAddressLines(listing.address.formattedAddress).firstAddressLine}
        </span>
        <span className={styles.listingCardLineItem}>
          {getAddressLines(listing.address.formattedAddress).secondAddressLine}
        </span>
      </div>
    </div>
  );
};

export default ListingCard;
