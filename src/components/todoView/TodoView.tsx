import * as React from "react";
import { Todo } from "types";
import { TodoCard } from "..";

interface TodoViewProps {
  todos: Array<Todo>;
}

const TodoView: React.FC<TodoViewProps> = ({ todos }) => {
  return (
    <React.Fragment>
      {todos.map((todo) => (
        <TodoCard todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoView;
