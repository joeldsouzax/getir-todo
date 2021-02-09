import * as React from "react";
import { useAppDispatch, setVisibility, useAppSelector, RootState } from "state";
import { Todo } from "types";
import { TodoCard } from "..";
import { LinkButton } from "../design/DesignSystem";

interface TodoViewProps {
  todos: Array<Todo>;
}

const TodoView: React.FC<TodoViewProps> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector((state: RootState) => state.filters);
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <LinkButton disabled={visibility === "all"} onClick={() => dispatch(setVisibility("all"))}>
          View All Todos
        </LinkButton>
        <LinkButton
          disabled={visibility === "completed"}
          onClick={() => dispatch(setVisibility("completed"))}
        >
          View Completed Todos
        </LinkButton>
        <LinkButton
          disabled={visibility === "incomplete"}
          onClick={() => dispatch(setVisibility("incomplete"))}
        >
          View Incomplete Todos
        </LinkButton>
      </div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </React.Fragment>
  );
};

export default TodoView;
