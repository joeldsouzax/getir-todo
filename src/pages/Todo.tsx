import * as React from "react";
import { Title, TodoForm, TodoView, Spinner } from "components";
import { useAppDispatch, useAppSelector, RootState, addTodo, getTodos, load } from "state";
import { Todo as TodoType } from "types";
import { createTodo, fetchAllTodos } from "api";
import { functor } from "../libs/functional";
import { createSelector } from "@reduxjs/toolkit";
import { useInterval } from "../hooks";

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
  const { loading, order } = useAppSelector((state: RootState) => ({
    loading: state.todos.loading,
    order: state.todos.todos.length > 0 ? state.todos.todos[state.todos.todos.length - 1].order : 0,
  }));

  const handleTodoAdd = React.useCallback(
    (value: Pick<TodoType, "title" | "completed">) => {
      functor(value)
        .map((value) => {
          dispatch(load(true));
          return value;
        })
        .chain((value) => createTodo({ ...value, order: order + 1 }))
        .then((data) => dispatch(addTodo(data)));
    },
    [dispatch, order]
  );

  React.useEffect(() => {
    functor("")
      .chain((d) => fetchAllTodos())
      .then((data) => dispatch(getTodos(data)));
  }, []);

  useInterval(() => {
    functor("")
      .chain((d) => fetchAllTodos())
      .then((data) => dispatch(getTodos(data)));
  }, 5000);

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
