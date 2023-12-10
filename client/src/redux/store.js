// redux k bina v kaaam chal skta hai...but for large apps we use redux
// yaha pe configuration set up krrhe hai...aur sb reducers ko ek sath 'user' k andar me integrate krrhe hai

// in sb chiz ko redux-dev tools (edge browser )  pe dekh skte hai...but page refresh krne se information ud jata hai...to ek npm package use krnge (local storage me information store krne k liye)
// redux-persist is a library for persisting and rehydrating a Redux store. It's commonly used in Redux applications to persist the state of the store to a storage medium, such as localStorage or AsyncStorage, allowing the state to be preserved across page reloads, app restarts, or even device reboots in the case of mobile applications,.

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
