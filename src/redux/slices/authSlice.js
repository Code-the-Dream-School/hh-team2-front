import { createSlice } from "@reduxjs/toolkit";
// createSlice bulid in inside reduxjs

const authSlice = createSlice({
    name: "auth", //any name 
    initialState: {
        user: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage:null,
    },
    reducers: {
        // setUser(state) {
        //     state.user = "Mohammed"
        // }
        login(state,action) {
            state.user = action.payload  // payload is the date came form the server
        },
        logout(state) {
            state.user = null; // Reset user state when logging out
          },
          register(state,action) {
            state.registerMessage = action.payload;
         },
        },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer}