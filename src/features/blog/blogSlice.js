import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        login: (state, action) => {

            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }

});

export const { login, logout } = blogSlice.actions;
export default blogSlice.reducer;