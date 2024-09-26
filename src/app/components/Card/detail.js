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

  const [showMore, setShowMore] = useState(false); // State to track "Show More" or "Show Less"

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
        id: propertyId, // this is propert id from the dataset
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDescription = async (event) => {
    setShowMore((prevShowMore) => !prevShowMore); // Toggle between expanded and collapsed
    if (event === "Show More") {
      // Log the activity before redirecting
      await activityService.createActivity({
        sessionId: getLocalStorageData("sessionId"),
        propertyId: property._id,
        id: property.id,
        action: "read_more_detail",
        timestamp: new Date(),
      });
    }
  };

  const descriptionToShow = property?.desc
    ? showMore
      ? property?.desc
      : property?.desc.slice(0, 300) +
        (property?.desc.length > 300 ? "..." : "")
    : "N/A";

  // Styles for the scrollable box
  const scrollableBoxStyle = {
    maxHeight: showMore ? "none" : "150px", // Height limit
    overflowY: showMore ? "visible" : "auto", // Scroll if needed
    padding: "10px", // Padding inside the box
    border: "1px solid #ddd", // Border around the box
    borderRadius: "4px", // Rounded corners
    backgroundColor: "#f9f9f9", // Light background
    position: "relative",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", // Font family
    fontSize: "16px", // Font size
    lineHeight: "1.6", // Line spacing for better readability
    textAlign: "justify", // Justify text
    marginTop: "20px", // Add space between the slider and the description box
  };
  
  const showMoreBtnStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginTop: "10px",
  };

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
          <div>
            <div style={scrollableBoxStyle}>
              <span>Description: {descriptionToShow}</span>
            </div>
            {property?.desc && property?.desc.length > 100 && (
              <button
                onClick={handleToggleDescription}
                style={showMoreBtnStyle}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CardDetailComponent;
