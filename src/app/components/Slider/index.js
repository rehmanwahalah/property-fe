import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./slider.module.css";
import "./slider.css";

const imageUrls = [
  "https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/home_33-6014-32.webp",
  "https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/home_40-6014-33.webp",
  "https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/calis_luxury_villa_2-6014-1.webp",
];

function AppendDots() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className={classes.dotsImageWrapper}>
        <img
          src={imageUrls[i]} // Use image URL from array based on index
          alt={`Slide ${i + 1}`}
        />
      </div>
    ),
  };
  return (
    <div className={`slider-container ${classes.sliderWrapper} `}>
      <Slider {...settings}>
        <div className={classes.slide}>
          <div className={classes.slideContentWrapper}>
            <img
              src="https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/home_33-6014-32.webp"
              alt="Slide 1"
            />
          </div>
        </div>
        <div className={classes.slide}>
          <div className={classes.slideContentWrapper}>
            <img
              src="https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/home_40-6014-33.webp"
              alt="Slide 2"
            />
          </div>
        </div>
        <div className={classes.slide}>
          <div className={classes.slideContentWrapper}>
            <img
              src="https://ptimages.s3.eu-west-2.amazonaws.com/img/properties_photos/calis_luxury_villa_2-6014-1.webp"
              alt="Slide 3"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
}
export default AppendDots;
