import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Todo } from "types";
import { Button, Card, Title } from "../design/DesignSystem";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <Card width="600px">
      <Title>{todo.title}</Title>
      <Button>
        {/* <FontAwesomeIcon icon={todo.status === "incomplete" ? faSquare : faCheckSquare} /> */}
      </Button>
    </Card>
  );
};

export default TodoCard;
