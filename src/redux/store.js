import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, // we give the date 

    }
});

export default store;