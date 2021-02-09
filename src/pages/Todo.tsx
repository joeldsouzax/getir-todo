import * as React from "react";
import { Title, TodoForm, TodoView, Spinner } from "components";
import { useAppDispatch, useAppSelector, RootState, addTodo, getTodos, load } from "state";
import { Todo as TodoType } from "types";
import { createTodo, fetchAllTodos } from "api";
import { functor } from "../libs/functional";
import { createSelector } from "@reduxjs/toolkit";

const selectVisibleTodos = createSelector(
  [(state: RootState) => state.todos.todos, (state: RootState) => state.filters],
  (todos, filter) => {
    switch (filter) {
      case "all":
        return todos;
      case "completed":
        return todos.filter((t) => t.completed);
      case "incomplete":
        return todos.filter((t) => !t.completed);
      default:
        throw new Error("Unknown filter: " + filter);
    }
  }
);

const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectVisibleTodos);
  const loading = useAppSelector((state: RootState) => state.todos.loading);

  const handleTodoAdd = React.useCallback(
    (value: Pick<TodoType, "title" | "completed">) => {
      functor(value)
        .map((value) => {
          dispatch(load(true));
          return value;
        })
        .chain((value) => createTodo({ ...value, order: todos.length + 1 }))
        .then((data) => dispatch(addTodo(data)));
    },
    [todos, dispatch]
  );

  React.useEffect(() => {
    functor(dispatch(load(true)))
      .chain(() => fetchAllTodos())
      .then((data) => dispatch(getTodos(data)));
  }, [dispatch]);

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", completed: false }} handleSubmit={handleTodoAdd} />
      {loading && (
        <Spinner
          style={{
            zIndex: 1000,
            position: "absolute",
            margin: "auto",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
        />
      )}
      <Title>Type your task and press enter</Title>
      <TodoView todos={todos} />
    </React.Fragment>
  );
};

export default Todo;
