import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchProperties,
  deleteProperty
} from "../redux/propertySlice";

function PropertyDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading } = useSelector(
    state => state.properties
  );


  useEffect(() => {

    if (properties.length === 0) {
      dispatch(fetchProperties());
    }

  }, [dispatch, properties.length]);


  const property = properties.find(
    property => property.id === id
  );


  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {

      await dispatch(
        deleteProperty(property.id)
      ).unwrap();

      navigate("/");

    } catch (error) {

      console.error(
        "Delete failed:",
        error
      );

    }

  };


  if (loading || !property) {

    return (
      <div className="details-loading">

        <div className="spinner-border text-primary"></div>

        <p>
          Loading property...
        </p>

      </div>
    );

  }


  return (

    <div className="property-details-page">

      <div className="property-details-container">


        {/* BACK BUTTON */}

        <button
          className="details-back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Properties
        </button>


        {/* PAGE HEADER */}

        <div className="details-page-header">

          <div>

            <h1>
              Property Details
            </h1>

            <p>
              View and manage property information
            </p>

          </div>

          <span
            className={
              property.status === "Available"
                ? "details-status available"
                : property.status === "Sold Out"
                ? "details-status sold"
                : "details-status rented"
            }
          >
            {property.status}
          </span>

        </div>


        {/* MAIN CONTENT */}

        <div className="row g-4">


          {/* IMAGE */}

          <div className="col-lg-7">

            <div className="details-image-card">

              <img
                src={property.image}
                alt={property.title}
                className="details-main-image"
              />

            </div>

          </div>


          {/* INFORMATION */}

          <div className="col-lg-5">

            <div className="details-info-card">

              <div className="details-title-section">

                <span className="details-type">
                  {property.type}
                </span>

                <h2>
                  {property.title}
                </h2>

                <p className="details-location">
                  📍 {property.location}
                </p>

              </div>


              {/* PRICE */}

              <div className="details-price-box">

                <small>
                  Property Price
                </small>

                <h3>
                  ₹{Number(property.price).toLocaleString("en-IN")}
                </h3>

              </div>


              {/* PROPERTY FEATURES */}

              <div className="details-features">

                <div className="feature-box">

                  <span className="feature-icon">
                    🛏
                  </span>

                  <div>
                    <strong>
                      {property.bedrooms}
                    </strong>

                    <small>
                      Bedrooms
                    </small>
                  </div>

                </div>


                <div className="feature-box">

                  <span className="feature-icon">
                    🚿
                  </span>

                  <div>
                    <strong>
                      {property.bathrooms}
                    </strong>

                    <small>
                      Bathrooms
                    </small>
                  </div>

                </div>


                <div className="feature-box">

                  <span className="feature-icon">
                    📐
                  </span>

                  <div>
                    <strong>
                      {property.area}
                    </strong>

                    <small>
                      Sqft
                    </small>
                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="details-description">

                <h5>
                  Description
                </h5>

                <p>
                  {property.description ||
                    "No description available for this property."}
                </p>

              </div>


              {/* ACTION BUTTONS */}

              <div className="details-actions">

                <button
                  className="details-edit-btn"
                  onClick={() =>
                    navigate(
                      `/edit-property/${property.id}`
                    )
                  }
                >
                  ✏️ Edit Property
                </button>


                <button
                  className="details-delete-btn"
                  onClick={handleDelete}
                >
                  🗑 Delete Property
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default PropertyDetails;