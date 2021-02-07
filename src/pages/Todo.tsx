import * as React from "react";
import { TodoForm, TodoView } from "components";
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
    [dispatch]
  );

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", status: "incomplete" }} handleSubmit={handleTodoAdd} />
      <TodoView todos={todos} />
    </React.Fragment>
  );
});

export default Todo;
