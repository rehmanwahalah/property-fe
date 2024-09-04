"use client"; // Add this directive at the top

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import Card from "./components/Card";
import NavbarCustom from "./components/Navbar";
import { propertyService } from "@/services/property.service";

export default function Home() {
  const [listings, setListings] = useState([]);

  const fetchProperties = async () => {
    try {
      const resp = await propertyService.getDashboardListings();
      if (resp.status === 200) {
        setListings(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <>
      <NavbarCustom />
      <main className={classes.main}>
        <section className={`container ${classes.cardsWrapper}`}>
          {listings &&
            listings.length &&
            listings?.map((property, i) => (
              <React.Fragment key={i}>
                <Card property={property} />
              </React.Fragment>
            ))}
        </section>
      </main>
    </>
  );
}
