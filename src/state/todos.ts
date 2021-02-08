import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTodo, getTodos } from "api";
import { Todo } from "../types";

export const fetchAllTodos = createAsyncThunk<Array<Todo>>("todos/fetchAll", async () => {
  const response = await getTodos();
  return response;
});

export const createNewTodo = createAsyncThunk<
  Todo,
  Pick<Todo, "title" | "complete" | "order">,
  { rejectValue: string }
>("todos/create", async (todo, { rejectWithValue }) => {
  try {
    const response = await createTodo(todo);
    return response;
  } catch (err) {
    return rejectWithValue("cannot add new todo");
  }
});

export const updateTodo = createAsyncThunk<Todo, Pick<Todo, "title" | "complete">>(
  "todos/update",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await createTodo(todo);
      return response;
    } catch (err) {
      return rejectWithValue("cannot add new todo");
    }
  }
);

export const deleteTodo = createAsyncThunk<Todo, Pick<Todo, "id">>("todos/delete", async (todo) => {
  const response = await createTodo(todo);
  return response;
});

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchAllTodos.fulfilled.toString()]: todoAdapter.addMany,
  },
});

const todoReducer = todoSlice.reducer;

export default todoReducer;
