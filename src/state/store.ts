import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import socketReducer from "./socket/socketSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        socket: socketReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;