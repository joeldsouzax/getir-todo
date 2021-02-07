import * as React from "react";
import { Todo } from "src/types";
import { Card, Input, Title } from "../design/DesignSystem";

interface TodoCardProps {
  todo: Todo;
  style?: React.CSSProperties;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, style }) => {
  return (
    <Card style={style} width="400px">
      <Title>{todo.title}</Title>
    </Card>
  );
};

export default TodoCard;
