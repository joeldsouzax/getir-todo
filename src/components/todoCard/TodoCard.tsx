import * as React from "react";
import { Card, Input, Title } from "../design/DesignSystem";

interface TodoCardProps {
  title: string;
  style?: React.CSSProperties;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, style }) => {
  return (
    <Card style={style} width="400px">
      <Input placeholder="Write your todo" />
    </Card>
  );
};

export default TodoCard;
