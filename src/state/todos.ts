import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";

const initialValue = {
  todos: [] as Array<Todo>,
  loading: "idle",
  error: null as string | null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Array<Todo>,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    getTodos: (state, action: PayloadAction<Array<Todo>>) => {
      return action.payload;
    },
    deleteTodos: (state, action: PayloadAction<string>) => {
      state.splice(
        state.findIndex((todo) => todo.id === action.payload),
        1
      );
    },
    updateTodos: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
  },
});

const todoReducer = todoSlice.reducer;
export const { addTodo, getTodos, deleteTodos, updateTodos } = todoSlice.actions;
export default todoReducer;
