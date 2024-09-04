"use client"; // Add this directive at the top

import React, { useEffect, useState, useCallback } from "react";
import classes from "./page.module.css";
import Card from "./components/Card";
import NavbarCustom from "./components/Navbar";
import ReactPaginate from "react-paginate";
import { propertyService } from "@/services/property.service";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(0); // Current page state, 0-based index for react-paginate
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchProperties = async (search = "", page = 1) => {
    setIsLoading(true);
    try {
      // Pass search term and page to API
      const resp = await propertyService.getPropertyListings(search, page, 20);
      console.log(`RESP =>`, resp);

      if (resp.status === 200) {
        setListings(resp.data.data.listings); // Set the listings data
        setTotalPages(resp.data.data.pages); // Set the total pages
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch properties when the component mounts or when page/search changes
  useEffect(() => {
    fetchProperties(searchTerm, currentPage + 1); // Add 1 to currentPage for 1-based index API
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

  // Handle page change for react-paginate
  const handlePageClick = (data) => {
    const selectedPage = data.selected; // selected is 0-based index
    setCurrentPage(selectedPage);
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
            {listings?.length > 0 ? (
              listings?.map((property, i) => (
                <React.Fragment key={i}>
                  <Card property={property} />
                </React.Fragment>
              ))
            ) : (
              <p>No properties found matching your search criteria.</p>
            )}
          </section>
        )}

        {/* React Pagination */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPages} // Total number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick} // Handle page click
          containerClassName={classes.paginationWrapper} // Custom CSS for pagination container
          activeClassName={classes.activePage} // Active page CSS
          previousClassName={classes.previousButton} // Previous button CSS
          nextClassName={classes.nextButton} // Next button CSS
          disabledClassName={classes.disabledButton} // Disabled button CSS
        />
      </main>
    </>
  );
}
