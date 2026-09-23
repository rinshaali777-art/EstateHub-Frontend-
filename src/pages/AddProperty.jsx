import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProperty } from "../redux/propertySlice";
import { useNavigate } from "react-router-dom";

function AddProperty() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    location: "",
    type: "Villa",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    status: "Available",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProperty({
      ...property,
      [name]: value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await dispatch(addProperty(property)).unwrap();
    console.log("Property added:", result);
    navigate("/");
  } catch (error) {
    console.error("Failed to add property:", error);
  }
};

  return (

    <div className="add-property-page">

      <div className="add-property-container">

        {/* BACK BUTTON */}

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Properties
        </button>


        {/* PAGE HEADER */}

        <div className="add-page-header">

          <div>
            <h1>Add New Property</h1>

            <p>
              Enter the details of your property below
            </p>
          </div>

        </div>


        {/* FORM CARD */}

        <div className="add-form-card">

          <div className="form-card-header">

            <div className="form-header-icon">
              🏠
            </div>

            <div>
              <h4>Property Information</h4>

              <p>
                Add all the important details about the property
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* TITLE + LOCATION */}

            <div className="row g-4">

              <div className="col-md-6">

                <label className="custom-label">
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="custom-input"
                  value={property.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Villa"
                  required
                />

              </div>


              <div className="col-md-6">

                <label className="custom-label">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="custom-input"
                  value={property.location}
                  onChange={handleChange}
                  placeholder="e.g. Calicut"
                  required
                />

              </div>


              {/* TYPE + PRICE */}

              <div className="col-md-6">

                <label className="custom-label">
                  Property Type
                </label>

                <select
                  name="type"
                  className="custom-input"
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


              <div className="col-md-6">

                <label className="custom-label">
                  Price
                </label>

                <div className="price-input">

                  <span>₹</span>

                  <input
                    type="number"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    placeholder="Enter property price"
                    required
                  />

                </div>

              </div>


              {/* BEDROOMS */}

              <div className="col-md-4">

                <label className="custom-label">
                  Bedrooms
                </label>

                <input
                  type="number"
                  name="bedrooms"
                  className="custom-input"
                  value={property.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                />

              </div>


              {/* BATHROOMS */}

              <div className="col-md-4">

                <label className="custom-label">
                  Bathrooms
                </label>

                <input
                  type="number"
                  name="bathrooms"
                  className="custom-input"
                  value={property.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                />

              </div>


              {/* AREA */}

              <div className="col-md-4">

                <label className="custom-label">
                  Area (sqft)
                </label>

                <input
                  type="number"
                  name="area"
                  className="custom-input"
                  value={property.area}
                  onChange={handleChange}
                  placeholder="e.g. 2500"
                />

              </div>


              {/* STATUS */}

              <div className="col-md-6">

                <label className="custom-label">
                  Status
                </label>

                <select
                  name="status"
                  className="custom-input"
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

                <label className="custom-label">
                  Property Image
                </label>

                <input
                  type="file"
                  className="custom-input"
                  accept="image/*"
                  onChange={(e) => {
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

                        ctx.drawImage(img, 0, 0, width, height);

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
                  }}
                />

              </div>


              {/* IMAGE PREVIEW */}

              {property.image && (

                <div className="col-12">

                  <div className="image-preview-box">

                    <div>
                      <p className="preview-title">
                        Image Preview
                      </p>

                      <img
                        src={property.image}
                        alt="Property Preview"
                        className="property-preview"
                      />
                    </div>

                  </div>

                </div>

              )}


              {/* DESCRIPTION */}

              <div className="col-12">

                <label className="custom-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="custom-input description-input"
                  rows="5"
                  value={property.description}
                  onChange={handleChange}
                  placeholder="Describe the property, facilities, location, etc."
                />

              </div>

            </div>


            {/* FORM BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>


              <button           
                type="submit"
                className="submit-property-btn"
              >
                + Add Property
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

export default AddProperty;