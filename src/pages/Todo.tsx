import * as React from "react";
import { Title, TodoForm, TodoView } from "components";
import { useAppDispatch, useAppSelector, RootState, addTodo, getTodos } from "state";
import { Todo as TodoType } from "types";
import { createTodo, fetchAllTodos } from "api";

const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);

  console.log(todos);

  const handleTodoAdd = React.useCallback(
    (value: Pick<TodoType, "title" | "completed">) => {
      createTodo({ ...value, order: todos.length + 1 }).then((data) => dispatch(addTodo(data)));
    },
    [todos, dispatch]
  );

  React.useEffect(() => {
    fetchAllTodos().then((data) => dispatch(getTodos(data)));
  }, [dispatch]);

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", completed: false }} handleSubmit={handleTodoAdd} />
      {todos.length > 0 ? (
        <React.Fragment>
          <Title>Type your task and press enter</Title>
          <TodoView todos={todos} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Title>Type your task and press enter</Title>
          <h1 style={{ fontSize: 40, marginTop: 0, paddingTop: 0 }}>⌨️💻🖊️</h1>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Todo;
