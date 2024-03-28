
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null
}

const socketSlice = createSlice({
    name:"socket",
    initialState,
    reducers:{
        createConnection : (state, actions)=>{
            state.socket = actions.payload
        }
    }
})

export default socketSlice.reducer
export const {createConnection} = socketSlice.actions