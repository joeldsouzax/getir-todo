import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types";

const initialValue = {
  todos: [] as Array<Todo>,
  loading: false,
  error: null as string | null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    getTodos: (state, action: PayloadAction<Array<Todo>>) => {
      state.loading = false;
      state.todos = action.payload;
    },
    deleteTodos: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.todos.splice(
        state.todos.findIndex((todo) => todo.id === action.payload),
        1
      );
    },
    updateTodos: (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = true;
      }
    },
    load: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const todoReducer = todoSlice.reducer;
export const { addTodo, getTodos, deleteTodos, updateTodos, load } = todoSlice.actions;
export default todoReducer;
