import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./slider.module.css";
import "./slider.css";

function AppendDots({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    simapeed: 500,
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
          src={images[i]} // Use image URL from array based on index
          alt={`Slide ${i + 1}`}
        />
      </div>
    ),
  };
  console.log(`images= >`, images);

  return (
    <div className={`slider-container ${classes.sliderWrapper} `}>
      <Slider {...settings}>
        {images &&
          images?.length &&
          images?.map((img, index) => {
            return (
              <div id={`image-${index}`} className={classes.slide}>
                <div className={classes.slideContentWrapper}>
                  <img src={img} alt="Slide 1" />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
export default AppendDots;
