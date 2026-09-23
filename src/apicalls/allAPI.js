import ApiService from "../api/apiService";

export const getPropertiesAPI = () => {
  return ApiService("GET", "/properties");
};

export const addPropertyAPI = (property) => {
  return ApiService("POST", "/properties", property);
};

export const updatePropertyAPI = (property) => {
  return ApiService(
    "PUT",
    `/properties/${property.id}`,
    property
  );
};

export const deletePropertyAPI = (id) => {
  return ApiService(
    "DELETE",
    `/properties/${id}`
  );
};