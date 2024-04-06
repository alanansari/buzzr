import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  players: any[];
  gameStarted: boolean;
}

const initialState: InitialState = {
  players: [],
  gameStarted: false,
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
    startGame: (state, action) => {
      state.gameStarted = action.payload;
    },
    stopGame: (state, action) => {
      state.gameStarted = action.payload;
    },
  },
});

export const { addPlayer, removePlayer, setPlayers, startGame, stopGame } =
  playerSlice.actions;

export default playerSlice.reducer;
