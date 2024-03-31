import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import socketReducer from "./socket/socketSlice";
import playerReducer from "./admin/playersSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        socket: socketReducer,
        player: playerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;