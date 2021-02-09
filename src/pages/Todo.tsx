import * as React from "react";
import { Title, TodoForm, TodoView, Spinner } from "components";
import { useAppDispatch, useAppSelector, RootState, addTodo, getTodos, load } from "state";
import { Todo as TodoType } from "types";
import { createTodo, fetchAllTodos } from "api";
import { functor } from "../libs/functional";

const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector((state: RootState) => state.todos);

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
