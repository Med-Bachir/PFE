import {createSlice} from "@reduxjs/toolkit"




const notifySlice = createSlice({
    name: "notify",
    initialState: {
        total: 0
    },
    reducers: {
        notifyTotal: (state, action) => {
            state.total = action.payload; // Update total with the payload received
        },
        resetNotification: (state) => {
            state.total = 0; // Update total with the payload received
        }
    }
});


export const {notifyTotal , resetNotification} = notifySlice.actions
export default notifySlice.reducer;