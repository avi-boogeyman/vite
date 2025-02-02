// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";

// Your reducers go here
import usersSlice from "../slices/usersSlice";

// Redux Persist configuration
const persistConfig = {
  key: "vite-project",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  usersSlice,
  // Add other reducers if needed
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
