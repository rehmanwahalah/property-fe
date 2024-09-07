"use client";
import React, { Suspense, useEffect, useState } from "react";
import classes from "./cardDetail.module.css";
import SliderPro from "../components/Slider";
import { useSearchParams } from "next/navigation";
import { propertyService } from "@/services/property.service";

const CardDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the property ID from the query string
  const [property, setProperty] = useState({});

  const fetchPropertDetails = async (id) => {
    try {
      const resp = await propertyService.getPropertyDetail(id);

      if (resp.status === 200) setProperty(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) fetchPropertDetails(id);
  }, [id]);

  return (
    <Suspense>
      <div className={`container ${classes.cardDetailWrapper}`}>
        <div className={classes.textWrapper}>
          <h1 className={classes.heading}>{property?.title || "N/A"}</h1>
          <div className={classes.infoWrapper}>
            <div className={classes.price}>
              Price: <span>{property?.price || "N/A"}</span>
            </div>
            <div className={classes.ref}>
              Ref: <span>{property?.id || "N/A"}</span>
            </div>
          </div>
          <div className={classes.sliderWrapper}>
            <SliderPro images={property?.imgs?.slice(0, 5)} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CardDetail;
