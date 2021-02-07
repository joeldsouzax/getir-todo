import * as React from "react";
import { Todo } from "src/types";
import { Button, Card, Title } from "../design/DesignSystem";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <Card width="600px">
      <Title>{todo.title}</Title>
      <Button>Done</Button>
    </Card>
  );
};

export default TodoCard;
