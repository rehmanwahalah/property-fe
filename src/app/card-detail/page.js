"use client";
import React, { Suspense, useEffect, useState } from "react";
import CardDetailComponent from "../components/Card/detail";

const CardDetail = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id"); // Get the property ID from the query string
  // const [property, setProperty] = useState({});

  // const fetchPropertDetails = async (id) => {
  //   try {
  //     const resp = await propertyService.getPropertyDetail(id);

  //     if (resp.status === 200) setProperty(resp.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  // if (id) fetchPropertDetails(id);
  // }, [id]);

  return (
    <Suspense>
      <CardDetailComponent />
    </Suspense>
  );
};

export default CardDetail;
