import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getPropertiesAPI,
  addPropertyAPI,
  updatePropertyAPI,
  deletePropertyAPI
} from "../apicalls/allAPI";


// GET
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {

    const response = await getPropertiesAPI();

    return response.data;
  }
);


// POST
export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async (property) => {

    const response = await addPropertyAPI(property);

    return response.data;
  }
);


// PUT
export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async (property) => {

    const response = await updatePropertyAPI(property);

    return response.data;
  }
);


// DELETE
export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id) => {

    await deletePropertyAPI(id);

    return id;
  }
);


const propertySlice = createSlice({

  name: "properties",

  initialState: {
    properties: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })

      .addCase(fetchProperties.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch properties";
      })


      // POST
      .addCase(addProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })


      // PUT
      .addCase(updateProperty.fulfilled, (state, action) => {

        const index = state.properties.findIndex(
          (property) => property.id === action.payload.id
        );

        if (index !== -1) {
          state.properties[index] = action.payload;
        }
      })


      // DELETE
      .addCase(deleteProperty.fulfilled, (state, action) => {

        state.properties = state.properties.filter(
          (property) => property.id !== action.payload
        );
      });

  }
});

export default propertySlice.reducer;