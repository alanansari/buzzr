import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  players: any[];
  quesResult:number[];
  currentIndex:number
}

const initialState: InitialState = {
  players: [],
  quesResult:[],
  currentIndex:0
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
    setResult: (state, action) => {
      state.quesResult = action.payload;
    },
    setCurrIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { addPlayer, removePlayer, setPlayers, setResult, setCurrIndex } =
  playerSlice.actions;

export default playerSlice.reducer;
