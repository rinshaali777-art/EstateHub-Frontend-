import {configureStore} from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";

const store = configureStore({
  reducer: {
    properties: propertyReducer
  }
});
export default store;