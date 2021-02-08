import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todos, { todoAdapter } from "./todos";
export * from "./todos";

const root = combineReducers({
  todos,
});

const store = configureStore({
  reducer: root,
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const todosSelector = todoAdapter.getSelectors((state: RootState) => state.todos);
export default store;
