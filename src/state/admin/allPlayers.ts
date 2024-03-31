import { createSlice } from "@reduxjs/toolkit";

interface Player {
    id: string;
    username: string;
}

interface InitialState {
    players: Player[];
}

const initialState: InitialState = {
    players: [{
        id: "",
        username: ""
    }]
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            state.players = [...state.players, action.payload]
        }
    },
});

export const { addPlayer } = playerSlice.actions;

export default playerSlice.reducer;
