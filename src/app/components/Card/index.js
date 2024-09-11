/* eslint-disable @next/next/no-img-element */
import React from "react";
import classes from "./card.module.css";
import ButtonPrimary from "../Button";
import { useRouter } from "next/navigation";
import { activityService } from "@/services/activity.service";

const Card = ({ property }) => {
  const router = useRouter(); // Initialize the router

  // Function to handle redirection
  const handleRedirect = async () => {
    // Log the activity before redirecting
    await activityService.createActivity({
      propertyId: property._id,
      action: "click",
      timestamp: new Date(),
    });

    // Redirect to the card-detail page, passing the property ID
    router.push(`/card-detail?id=${property?._id}`);
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
        <div onClick={handleRedirect} className={classes.cardImageWrapper}>
          <img
            className={classes.cardImage}
            src={property?.imgs[0]}
            alt="cardImage"
          />
        </div>
      </div>
      <div className={classes.textContentWrapper}>
        <div className={classes.cardHeading}>{property?.title || "N/A"}</div>
        <div className={classes.cardDesc}>{property?.desc}</div>
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
