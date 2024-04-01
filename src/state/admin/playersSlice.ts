import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  players: any[];
}

const initialState: InitialState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      const existingPlayer = state.players.find(
        (player: any) => player.id === action.payload.id
      );
      if (existingPlayer) {
        return;
      }
      state.players = [action.payload, ...state.players];
    },
    removePlayer: (state, action) => {
      console.log(action.payload);
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id
      );
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { addPlayer, removePlayer, setPlayers } = playerSlice.actions;

export default playerSlice.reducer;
