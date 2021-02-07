import * as React from "react";
import { Title, TodoForm, TodoView } from "components";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, todosSelector } from "state";
import { nanoid } from "@reduxjs/toolkit";
import { Todo as TodoType } from "types";

const Todo: React.FC = React.memo(() => {
  const todos = useSelector(todosSelector.selectAll);
  const dispatch = useDispatch();

  const handleTodoAdd = React.useCallback(
    (value: Omit<TodoType, "id">) => {
      dispatch(addTodo({ id: nanoid(), ...value }));
    },
    [dispatch, todos]
  );

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", status: "incomplete" }} handleSubmit={handleTodoAdd} />
      {todos.length > 0 ? (
        <TodoView todos={todos} />
      ) : (
        <React.Fragment>
          <Title>Type your task and press enter</Title>
          <h1 style={{ fontSize: 40, marginTop: 0, paddingTop: 0 }}>⌨️📔💻🖊️</h1>
        </React.Fragment>
      )}
    </React.Fragment>
  );
});

export default Todo;
