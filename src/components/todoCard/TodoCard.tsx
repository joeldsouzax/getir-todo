import * as React from "react";
import { Card, Title } from "../design/DesignSystem";

interface TodoCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const TodoCard: React.FC<TodoCardProps> = ({ children, style }) => {
  return (
    <Card style={style} width="400px">
      <Title>{children}</Title>
    </Card>
  );
};

export default TodoCard;
