"use client"; // Add this directive at the top

import React, { useEffect, useState, useCallback } from "react";
import classes from "./page.module.css";
import Card from "./components/Card";
import NavbarCustom from "./components/Navbar";
import { propertyService } from "@/services/property.service";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchProperties = async (search = "", page = 1) => {
    setIsLoading(true);
    try {
      // Pass search term and page to API
      const resp = await propertyService.getPropertyListings(search, page, 20);
      if (resp.status === 200) {
        console.log(`RESP =>`, resp);

        setListings(resp.data.data); // Set the listings data
        setTotalPages(resp.data.totalPages); // Set the total pages
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch properties when the component mounts or when page/search changes
  useEffect(() => {
    fetchProperties(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  // Debounce function to delay search API calls until user stops typing
  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Handle search input and debounce it
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  // Debounced search function (wait for 500ms after user stops typing)
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <NavbarCustom />

      {/* Search Input */}
      <div className={classes.searchWrapper}>
        <input
          type="text"
          placeholder="Search by property name or location"
          onChange={debouncedSearch} // Debounced search input
          className={classes.searchInput}
        />
      </div>

      <main className={classes.main}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className={`container ${classes.cardsWrapper}`}>
            {listings.length > 0 ? (
              listings.map((property, i) => (
                <React.Fragment key={i}>
                  <Card property={property} />
                </React.Fragment>
              ))
            ) : (
              <p>No properties found matching your search criteria.</p>
            )}
          </section>
        )}

        {/* Pagination Controls */}
        <div className={classes.paginationWrapper}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
