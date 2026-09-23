import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProperties,
  updateProperty
} from "../redux/propertySlice";

function EditProperty() {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties } = useSelector(
    state => state.properties
  );

  const [property, setProperty] = useState(null);


  // Fetch properties if Redux is empty

  useEffect(() => {

    if (properties.length === 0) {
      dispatch(fetchProperties());
    }

  }, [dispatch, properties.length]);


  // Find selected property

  useEffect(() => {

    const selectedProperty = properties.find(
      pro => pro.id === id
    );

    if (selectedProperty) {
      setProperty(selectedProperty);
    }

  }, [properties, id]);


  // Handle input changes

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProperty({
      ...property,
      [name]: value
    });

  };


  // Handle image

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 800;
      const maxHeight = 600;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        0,
        0,
        width,
        height
      );

      const compressedImage = canvas.toDataURL(
        "image/jpeg",
        0.6
      );

      setProperty({
        ...property,
        image: compressedImage
      });
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
};


  // Update property

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(updateProperty(property));

    navigate(`/property-details/${property.id}`);

  };


  // Loading

  if (!property) {

    return (
      <div className="edit-loading">

        <div className="spinner-border text-primary"></div>

        <h5>
          Loading property...
        </h5>

      </div>
    );

  }


  return (

    <div className="edit-property-page">

      <div className="edit-property-container">


        {/* BACK BUTTON */}

        <button
          className="edit-back-btn"
          onClick={() =>
            navigate(`/property-details/${property.id}`)
          }
        >
          ← Back to Property
        </button>


        {/* PAGE HEADER */}

        <div className="edit-page-header">

          <div>

            <h1>
              Edit Property
            </h1>

            <p>
              Update the property information below
            </p>

          </div>

          <div className="edit-property-id">
            ID: {property.id}
          </div>

        </div>


        {/* FORM CARD */}

        <div className="edit-form-card">


          {/* FORM HEADER */}

          <div className="edit-form-header">

            <div className="edit-form-icon">
              ✏️
            </div>

            <div>

              <h4>
                Property Information
              </h4>

              <p>
                Modify the details of this property
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="row g-4">


              {/* TITLE */}

              <div className="col-md-6">

                <label className="edit-label">
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="edit-input"
                  value={property.title}
                  onChange={handleChange}
                  placeholder="Property title"
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="col-md-6">

                <label className="edit-label">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="edit-input"
                  value={property.location}
                  onChange={handleChange}
                  placeholder="Property location"
                  required
                />

              </div>


              {/* TYPE */}

              <div className="col-md-6">

                <label className="edit-label">
                  Property Type
                </label>

                <select
                  name="type"
                  className="edit-input"
                  value={property.type}
                  onChange={handleChange}
                >

                  <option value="Villa">
                    Villa
                  </option>

                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="House">
                    House
                  </option>

                  <option value="Plot">
                    Plot
                  </option>

                </select>

              </div>


              {/* PRICE */}

              <div className="col-md-6">

                <label className="edit-label">
                  Price
                </label>

                <div className="edit-price-input">

                  <span>₹</span>

                  <input
                    type="number"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />

                </div>

              </div>


              {/* BEDROOMS */}

              <div className="col-md-4">

                <label className="edit-label">
                  Bedrooms
                </label>

                <input
                  type="number"
                  name="bedrooms"
                  className="edit-input"
                  value={property.bedrooms}
                  onChange={handleChange}
                  placeholder="Bedrooms"
                />

              </div>


              {/* BATHROOMS */}

              <div className="col-md-4">

                <label className="edit-label">
                  Bathrooms
                </label>

                <input
                  type="number"
                  name="bathrooms"
                  className="edit-input"
                  value={property.bathrooms}
                  onChange={handleChange}
                  placeholder="Bathrooms"
                />

              </div>


              {/* AREA */}

              <div className="col-md-4">

                <label className="edit-label">
                  Area (sqft)
                </label>

                <input
                  type="number"
                  name="area"
                  className="edit-input"
                  value={property.area}
                  onChange={handleChange}
                  placeholder="Area"
                />

              </div>


              {/* STATUS */}

              <div className="col-md-6">

                <label className="edit-label">
                  Status
                </label>

                <select
                  name="status"
                  className="edit-input"
                  value={property.status}
                  onChange={handleChange}
                >

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


              {/* IMAGE */}

              <div className="col-md-6">

                <label className="edit-label">
                  Change Property Image
                </label>

                <input
                  type="file"
                  className="edit-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </div>


              {/* IMAGE PREVIEW */}

              {property.image && (

                <div className="col-12">

                  <div className="edit-image-preview">

                    <div>

                      <p className="edit-preview-title">
                        Current Property Image
                      </p>

                      <img
                        src={property.image}
                        alt={property.title}
                        className="edit-property-image"
                      />

                    </div>

                  </div>

                </div>

              )}


              {/* DESCRIPTION */}

              <div className="col-12">

                <label className="edit-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="edit-input edit-description"
                  rows="5"
                  value={property.description || ""}
                  onChange={handleChange}
                  placeholder="Property description..."
                />

              </div>

            </div>


            {/* BUTTONS */}

            <div className="edit-form-actions">

              <button
                type="button"
                className="edit-cancel-btn"
                onClick={() =>
                  navigate(
                    `/property-details/${property.id}`
                  )
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="edit-update-btn"
              >
                ✓ Update Property
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

export default EditProperty;