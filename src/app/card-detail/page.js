"use client";
import React from "react";
import classes from "./cardDetail.module.css";
import SliderPro from "../components/Slider";

const CardDetail = () => {
  return (
    <div className={`container ${classes.cardDetailWrapper}`}>
      <div className={classes.textWrapper}>
        <h1 className={classes.heading}>
          Luxury Calis villa with indoor and outdoor swimming pool
        </h1>
        <div className={classes.infoWrapper}>
          <div className={classes.price}>
            Price: <span>$406.000</span>
          </div>
          <div className={classes.ref}>
            Ref: <span>PTFS6014</span>
          </div>
        </div>
        <div className={classes.sliderWrapper}>
          <SliderPro />
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
