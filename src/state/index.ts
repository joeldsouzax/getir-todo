import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todos, { todoAdapter } from "./todos";
export * from "./todos";

const root = combineReducers({
  todos,
});

const store = configureStore({
  reducer: root,
});

export type RootState = ReturnType<typeof store.getState>;
export const todosSelector = todoAdapter.getSelectors((state: RootState) => state.todos);
export default store;
