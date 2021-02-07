import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types";

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoAdapter.getInitialState(),
  reducers: {
    addTodo: todoAdapter.addOne,
    upsertTodo: todoAdapter.updateOne,
    updateTodo: todoAdapter.updateOne,
  },
});

const todoReducer = todoSlice.reducer;
export const { addTodo, upsertTodo, updateTodo } = todoSlice.actions;
export default todoReducer;
