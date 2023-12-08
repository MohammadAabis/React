import { configureStore } from "@reduxjs/toolkit";
//import UserSlice from "../features/userSlice";
import userReducer from "../features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//const expireReducer = require("redux-persist-expire");

const persistConfig = {
  key: "user",
  storage,
  //transforms: [expireReducer(userReducer, { expireSeconds: 10 })],
};
const removeData = (userReducer) => {
  userReducer.email = "";
};
const persistAuthReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistAuthReducer,
  },
});

export const persistedStore = persistStore(store);
