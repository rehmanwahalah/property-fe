/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import classes from "./card.module.css";
import ButtonPrimary from "../Button";
import { useRouter } from "next/navigation";
import { activityService } from "@/services/activity.service";
import { getLocalStorageData } from "../../../../utils/localstorage";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Navigation } from "swiper/modules";

const Card = ({ property }) => {
  const router = useRouter(); // Initialize the router
  const [isExpanded, setIsExpanded] = useState(false); // State to control description toggle

  // Function to handle redirection
  const handleRedirect = async () => {
    // Log the activity before redirecting
    await activityService.createActivity({
      sessionId: getLocalStorageData("sessionId"),
      propertyId: property._id,
      id: property.id,
      action: "click",
      timestamp: new Date(),
    });

    // Redirect to the card-detail page, passing the property ID
    router.push(`/card-detail?id=${property?._id}&propertyId=${property?.id}`);
  };

  // Shortened summary if it's greater than 50 characters
  const shortSummary =
    property?.thumbnail_summary?.length > 50
      ? property?.thumbnail_summary.slice(0, 50) + "..."
      : property?.thumbnail_summary;

  const handleToggleDescription = async (event) => {
    setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
    if (event === "Show More") {
      // Log the activity before redirecting
      await activityService.createActivity({
        sessionId: getLocalStorageData("sessionId"),
        propertyId: property._id,
        id: property.id,
        action: "read_more_listing",
        timestamp: new Date(),
      });
    }
  };

  const handleSlideClick = async (index) => {
    try {
      /**
       * track next image event
       */
      await activityService.createActivity({
        sessionId: getLocalStorageData("sessionId"),
        propertyId: property._id, // monogdb Property ID from the query
        action: "nxt_img_listing",
        timestamp: new Date(),
        id: property.id, // this is propert id from the dataset
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.cardWrapper}>
      <div className={classes.imageContentWrapper}>
        <div className={classes.cardType}>
          {property?.features?.property_type_}
        </div>
        {/* <div className={classes.favoriteIconWrapper}>
          <img className={classes.favoriteIcon} src="" alt="favorite" />
        </div> */}
        <div className={classes.cardImageWrapper}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            onSlideChange={(swiper) => handleSlideClick(swiper.activeIndex)}
          >
            {property?.imgs?.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img src={imgUrl} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <img
            className={classes.cardImage}
            src={property?.imgs[0]}
            alt="cardImage"
          /> */}
        </div>
      </div>
      <div className={classes.textContentWrapper}>
        <div onClick={handleRedirect} className={classes.cardHeading}>
          {property?.title || "N/A"}
        </div>
        {/* <div className={classes.cardDesc}>{property?.thumbnail_summary}</div> */}
        <div
          className={`${classes.cardDesc} ${
            isExpanded ? classes.expanded : ""
          }`}
        >
          {isExpanded ? property?.thumbnail_summary : shortSummary}
        </div>

        {property?.thumbnail_summary?.length > 50 && (
          <button
            className={classes.toggleButton}
            onClick={() => {
              handleToggleDescription(isExpanded ? "Show Less" : "Show More");
            }}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
        <div className={classes.cardFeatures}>
          <div className={classes.featureWrapper}>
            <img
              src="https://www.propertyturkey.com/pt/images/location.svg"
              alt="Location Icon"
            />
            <p>{property?.features?.location_?.split("-")[0]}</p>
          </div>
          <div className={classes.featureWrapper}>
            <img
              src="https://www.propertyturkey.com/pt/images/bedrooms.svg"
              alt="Bedroom Icon"
            />
            <p>{property?.features?.bedrooms_}</p>
          </div>
          <div className={classes.featureWrapper}>
            <img
              src="https://www.propertyturkey.com/pt/images/bathrooms.svg"
              alt="Bathroom Icon"
            />
            <p>{property?.features?.bathrooms}</p>
          </div>
          <div className={classes.featureWrapper}>
            <p>{property?.features?.living_space_sqm} sq.m</p>
          </div>
        </div>
        <div className={classes.refNumber}>Ref: {property?.id} </div>
        <div className={classes.cardFooter}>
          <div className={classes.price}>{property?.price}</div>
          <ButtonPrimary
            className={classes.button}
            text="Quick Enquire"
            onClick={handleRedirect}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
