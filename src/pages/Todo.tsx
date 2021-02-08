import * as React from "react";
import { Title, TodoForm, TodoView } from "components";
import { useSelector } from "react-redux";
import { createNewTodo, todosSelector, fetchAllTodos, useAppDispatch } from "state";
import { Todo as TodoType } from "types";

const Todo: React.FC = React.memo(() => {
  const todos = useSelector(todosSelector.selectAll);
  const dispatch = useAppDispatch();

  console.log(todos);

  const handleTodoAdd = React.useCallback(
    (value: Pick<TodoType, "title" | "complete">) => {
      dispatch(createNewTodo({ order: todos.length + 1, ...value }));
    },
    [dispatch, todos]
  );

  React.useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", complete: false }} handleSubmit={handleTodoAdd} />

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
});

export default Todo;
