import {createSlice} from "@reduxjs/toolkit"




const drawerSlice = createSlice({
    name: "drawer",
    initialState : {
        open : false
    },
    reducers:{
        OpenDrawer : (state ,action) => {
            {state.open == false ? state.open = true : state.open = false }
        }
    }
})


export const {OpenDrawer} = drawerSlice.actions
export default drawerSlice.reducer;