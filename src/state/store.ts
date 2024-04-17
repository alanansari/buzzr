import { combineReducers, configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socket/socketSlice";
import playerReducer from "./admin/playersSlice";
import timerReducer from "./timer/timerSlice";
import screenReducer from "./player/screenSlice";
import adminScreenReducer from "./admin/screenSlice";
import playerResultReducer from "./player/resultSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  socket: socketReducer,
  player: playerReducer,
  timer: timerReducer,
  screen: screenReducer,
  adminscreen: adminScreenReducer,
  playerResult: playerResultReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
