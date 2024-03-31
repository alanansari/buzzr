import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    players: any[];
}

const initialState: InitialState = {
    players: []
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            const existingPlayer = state.players.find((player: any) => player.id === action.payload.id);
            console.log(state.players, action.payload)
            if (existingPlayer) {
                return;
            }
            state.players = [action.payload, ...state.players]
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter((player) => player.id !== action.payload.id)
        }
    },
});

export const { addPlayer,removePlayer } = playerSlice.actions;

export default playerSlice.reducer;
