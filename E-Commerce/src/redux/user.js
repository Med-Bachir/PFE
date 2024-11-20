import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        Error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.Error = true;
        },
        signout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.Error = false;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, signout } = userSlice.actions;
export default userSlice.reducer;