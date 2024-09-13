import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./slider.module.css";
import "./slider.css";

function AppendDots({ images, onSlideClick }) {
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
    beforeChange: (current, next) => onSlideClick(current, next), // Trigger function when the slide changes
  };

  return (
    <div className={`slider-container ${classes.sliderWrapper} `}>
      <Slider {...settings}>
        {images &&
          images?.length &&
          images?.map((img, index) => {
            return (
              <div
                key={`${index + 1}`}
                id={`image-${index}`}
                className={classes.slide}
                onClick={() => onSlideClick(index, img)} // Add onClick handler here
              >
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
