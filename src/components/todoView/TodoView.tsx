import * as React from "react";
import { Todo } from "types";
import { TodoCard } from "..";
import { LinkButton } from "../design/DesignSystem";

interface TodoViewProps {
  todos: Array<Todo>;
}

const TodoView: React.FC<TodoViewProps> = ({ todos }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <LinkButton>View All Todos</LinkButton>
        <LinkButton>View Completed Todos</LinkButton>
        <LinkButton>View Incomplete Todos</LinkButton>
      </div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoView;
