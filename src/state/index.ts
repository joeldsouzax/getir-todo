import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todos from "./todos";
export * from "./todos";

const root = combineReducers({
  todos,
});

const store = configureStore({
  reducer: root,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
