import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../redux/propertySlice';
import Pagination from '../components/Pagination';
import { useNavigate } from "react-router-dom";

function Landing() {

   const {properties,loading,error} = useSelector(state=>state.properties)
   
   const navigate = useNavigate();

   const [search, setSearch] = useState("");

   const [statusFilter, setStatusFilter] = useState("All");
   const [placeFilter, setPlaceFilter] = useState("All");
   const [typeFilter, setTypeFilter] = useState("All");
   const [priceFilter, setPriceFilter] = useState("Default");

   const [currentPage, setCurrentPage] = useState(1);
   const propertiesPerPage = 8;

   const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(fetchProperties())
   },[])


    const places = ["All",
    ...new Set(properties.map(property => property.location))];
    const propertyTypes = ["All",
    ...new Set(properties.map(property => property.type))];


   const filteredProperties = properties.filter((property) => {
        
        const searchMatch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.type.toLowerCase().includes(search.toLowerCase())


        const statusMatch =
        statusFilter === "All" ||
        property.status === statusFilter;

        const placeMatch =
        placeFilter === "All" ||
        property.location === placeFilter;

        const typeMatch =
        typeFilter === "All" ||
        property.type === typeFilter;

        return searchMatch && statusMatch && placeMatch && typeMatch;
    })
    .sort((a, b) => {

        if (priceFilter === "Low to High") {
        return Number(a.price) - Number(b.price);
        }

        if (priceFilter === "High to Low") {
        return Number(b.price) - Number(a.price);
        }

        return 0;

    });



    const lastIndex = currentPage * propertiesPerPage;
    const firstIndex = lastIndex - propertiesPerPage;
    const currentProperties = filteredProperties.slice(firstIndex, lastIndex
    );



    useEffect(() => {
    setCurrentPage(1);
    }, [search,
        statusFilter,
        placeFilter,
        typeFilter,
        priceFilter
    ]);

   if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading properties...</h4>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>{error}</h4>
      </div>
    );
  }


 return (
  <div className="landing-page">

    {/* HEADER */}
    <Header
      search={search}
      setSearch={setSearch}
    />

    <main className="dashboard-container">

      {/* PAGE TITLE */}
      <div className="page-heading">

        <div>
          <h1>Properties</h1>
          <p>Browse and manage all properties</p>
        </div>

        <button
          className="add-property-btn"
          onClick={() => navigate("/add-property")}
        >
          <span>+</span>
          Add Property
        </button>

      </div>


      {/* STATISTICS */}
      <div className="row g-4 mb-4">

        {/* TOTAL */}
        <div className="col-lg-3 col-md-6">
          <div className="stat-card total-card">

            <div className="stat-icon">
              🏠
            </div>

            <div>
              <p>Total Properties</p>
              <h2>{properties.length}</h2>
            </div>

          </div>
        </div>


        {/* AVAILABLE */}
        <div className="col-lg-3 col-md-6">
          <div className="stat-card available-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <p>Available</p>

              <h2>
                {
                  properties.filter(
                    property => property.status === "Available"
                  ).length
                }
              </h2>
            </div>

          </div>
        </div>


        {/* SOLD */}
        <div className="col-lg-3 col-md-6">
          <div className="stat-card sold-card">

            <div className="stat-icon">
              $
            </div>

            <div>
              <p>Sold Out</p>

              <h2>
                {
                  properties.filter(
                    property => property.status === "Sold Out"
                  ).length
                }
              </h2>
            </div>

          </div>
        </div>


        {/* RENTED */}
        <div className="col-lg-3 col-md-6">
          <div className="stat-card rented-card">

            <div className="stat-icon">
              🔑
            </div>

            <div>
              <p>Rented</p>

              <h2>
                {
                  properties.filter(
                    property => property.status === "Rented"
                  ).length
                }
              </h2>
            </div>

          </div>
        </div>

      </div>


      {/* FILTER SECTION */}
      <div className="filter-card">

        <div className="filter-header">

          <div>
            <h5>Filter Properties</h5>
            <small>Find properties using multiple filters</small>
          </div>

          <button
            className="clear-filter-btn"
            onClick={() => {
              setStatusFilter("All");
              setPlaceFilter("All");
              setTypeFilter("All");
              setPriceFilter("Default");
              setCurrentPage(1);
            }}
          >
            ↻ Clear Filters
          </button>

        </div>


        <div className="row g-3">

          {/* STATUS */}
          <div className="col-lg-3 col-md-6">

            <label>
              Status
            </label>

            <select
              className="form-select filter-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">
                All Status
              </option>

              <option value="Available">
                Available
              </option>

              <option value="Sold Out">
                Sold Out
              </option>

              <option value="Rented">
                Rented
              </option>

            </select>

          </div>


          {/* PLACE */}
          <div className="col-lg-3 col-md-6">

            <label>
              Place
            </label>

            <select
              className="form-select filter-select"
              value={placeFilter}
              onChange={(e) => {
                setPlaceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >

              {
                places.map(place => (
                  <option
                    key={place}
                    value={place}
                  >
                    {
                      place === "All"
                        ? "All Places"
                        : place
                    }
                  </option>
                ))
              }

            </select>

          </div>


          {/* TYPE */}
          <div className="col-lg-3 col-md-6">

            <label>
              Property Type
            </label>

            <select
              className="form-select filter-select"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >

              {
                propertyTypes.map(type => (
                  <option
                    key={type}
                    value={type}
                  >
                    {
                      type === "All"
                        ? "All Types"
                        : type
                    }
                  </option>
                ))
              }

            </select>

          </div>


          {/* PRICE */}
          <div className="col-lg-3 col-md-6">

            <label>
              Price
            </label>

            <select
              className="form-select filter-select"
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >

              <option value="Default">
                Default
              </option>

              <option value="Low to High">
                Low to High
              </option>

              <option value="High to Low">
                High to Low
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* PROPERTY SECTION HEADER */}
      <div className="properties-header">

        <div>
          <h3>Property Listings</h3>

          <p>
            Showing{" "}
            <strong>
              {currentProperties.length}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredProperties.length}
            </strong>{" "}
            properties
          </p>
        </div>

      </div>


      {/* PROPERTY CARDS */}
      <div className="row g-4">

        {
          currentProperties.length > 0 ? (

            currentProperties.map(property => (

              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                key={property.id}
              >

                <div
                  className={`property-card ${
                    property.status === "Sold Out" ||
                    property.status === "Rented"
                      ? "disabled-property"
                      : ""
                  }`}
                >

                  {/* IMAGE */}
                  <div className="property-image-wrapper">

                    <img
                      src={property.image}
                      alt={property.title}
                      className="property-image"
                    />

                    {/* STATUS */}
                    <span
                      className={`property-status ${
                        property.status === "Available"
                          ? "status-available"
                          : property.status === "Sold Out"
                          ? "status-sold"
                          : "status-rented"
                      }`}
                    >
                      {property.status}
                    </span>

                  </div>


                  {/* CARD BODY */}
                  <div className="property-card-body">

                    <h5 className="property-title">
                      {property.title}
                    </h5>


                    <p className="property-location">
                      <span>📍</span>
                      {property.location}
                    </p>


                    <h4 className="property-price">
                      ₹{Number(property.price).toLocaleString("en-IN")}
                    </h4>


                    {/* PROPERTY INFO */}
                    <div className="property-info">

                      <span>
                        🛏
                        <strong>
                          {property.bedrooms}
                        </strong>
                      </span>

                      <span>
                        🚿
                        <strong>
                          {property.bathrooms}
                        </strong>
                      </span>

                      <span>
                        📐
                        <strong>
                          {property.area}
                        </strong>{" "}
                        sqft
                      </span>

                    </div>


                    {/* BUTTON */}
                    <button
                      className="view-details-btn"
                      onClick={() =>
                        navigate(
                          `/property-details/${property.id}`
                        )
                      }
                    >
                      View Details
                      <span>→</span>
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-properties">

              <div className="empty-icon">
                🏠
              </div>

              <h4>
                No Properties Found
              </h4>

              <p>
                Try changing your filters.
              </p>

            </div>

          )

        }

      </div>


      {/* PAGINATION */}
      <div className="pagination-wrapper">

        <Pagination
          totalProperties={filteredProperties.length}
          propertiesPerPage={propertiesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

      </div>

    </main>

  </div>
);
}

export default Landing