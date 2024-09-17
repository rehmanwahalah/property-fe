"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import classes from "../../card-detail/cardDetail.module.css";
import SliderPro from "../../components/Slider/index";
import { useSearchParams } from "next/navigation";
import { propertyService } from "@/services/property.service";
import { activityService } from "@/services/activity.service";
import { getLocalStorageData } from "../../../../utils/localstorage";

const CardDetailComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the property ID from the query string
  const propertyId = searchParams.get("propertyId"); // Get the property ID from the query string
  const [property, setProperty] = useState({});
  const [startTime, setStartTime] = useState(null); // State to store the start time
  const hasLoggedViewRef = useRef(false); // useRef to track if "view" activity is logged

  useEffect(() => {
    // When the component mounts (user lands on the page), capture the start time
    const entryTime = Date.now();
    setStartTime(entryTime);

    // Cleanup function to run when the user navigates away from the page
    return () => {
      const exitTime = Date.now();
      const timeSpent = Math.floor((exitTime - entryTime) / 1000); // Calculate time spent in seconds

      if (id && timeSpent > 0) {
        // Log the time spent to the backend
        const logTimeSpent = async () => {
          try {
            console.log(`COMPONENT KILLED`);
            await activityService.createActivity({
              sessionId: getLocalStorageData("sessionId"),
              propertyId: id, // Property ID from the query
              action: "time_spent", // Action is "time_spent"
              timestamp: new Date(),
              duration: timeSpent, // Time spent in seconds
              id: propertyId, // this is propert id from the dataset
            });
          } catch (error) {
            console.error("Error logging time spent activity:", error);
          }
        };

        logTimeSpent();
      }
    };
  }, [id]); // Dependency on id to ensure this effect runs when the property ID is available

  const fetchPropertDetails = async (id) => {
    try {
      const resp = await propertyService.getPropertyDetail(id);

      if (resp.status === 200) {
        setProperty(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchPropertDetails(id);
  }, [id]);

  const updateView = async () => {
    // Log the activity only once
    if (!hasLoggedViewRef.current && id) {
      hasLoggedViewRef.current = true; // Mark as logged
      try {
        await activityService.createActivity({
          sessionId: getLocalStorageData("sessionId"),
          propertyId: id,
          action: "view",
          timestamp: new Date(),
          id: propertyId, // this is propert id from the dataset
        });
      } catch (error) {
        console.error("Error logging view activity:", error);
      }
    }
  };

  // UseEffect to log the "view" action only once when id changes
  useEffect(() => {
    if (id && !hasLoggedViewRef.current) {
      updateView();
    }
  }, [id]); // Add dependencies to run only once when id changes and hasn't been logged yet

  const handleSlideClick = async (index, img) => {
    try {
      /**
       * track next image event
       */
      await activityService.createActivity({
        sessionId: getLocalStorageData("sessionId"),
        propertyId: id, // monogdb Property ID from the query
        action: "nxt_img_detail",
        timestamp: new Date(),
        id: propertyId,  // this is propert id from the dataset
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(`propertyId =>`, propertyId);

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
            <SliderPro
              images={property?.imgs?.slice(0, 5)}
              onSlideClick={handleSlideClick}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CardDetailComponent;
