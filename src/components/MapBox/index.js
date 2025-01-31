import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./styles.module.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2lzaG1hc3RlcjIwMTYiLCJhIjoiY202a2kweG80MGV2bzJqc2Rjb2hvY3hjNCJ9.7JkZwK8wHAzlH8AAmcvVuA";

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const listings = useSelector((state) => state.listings.filteredListings);

  useEffect(() => {
    if (!listings.length) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    const bounds = new mapboxgl.LngLatBounds();
    const geojson = {
      type: "FeatureCollection",
      features: listings.map((listing) => {
        const [lat, lng] = listing.address.location;
        bounds.extend([lng, lat]);
        return {
          type: "Feature",
          properties: {
            id: listing._id,
            address: listing.address.formattedAddress,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    map.current.on("load", () => {
      map.current.scrollZoom.enable();
      map.current.doubleClickZoom.enable();
      map.current.dragPan.enable();
      map.current.touchZoomRotate.enable();

      map.current.addSource("listings", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "listings",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#ffffff",
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 30, 40],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#e9e9e9",
        },
      });

      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "listings",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": 20,
        },
      });

      map.current.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "listings",
        filter: ["!has", "point_count"],
        paint: {
          "circle-color": "#1c85e8",
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });
    });

    return () => map.current.remove();
  }, [listings]);

  return <div className={styles.mapBoxContainer} ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapBox;
