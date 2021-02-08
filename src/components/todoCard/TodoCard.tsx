import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "api";
import { deleteTodos, updateTodos } from "state";
import { Todo } from "types";
import { Button, Card, TaskTitle } from "../design/DesignSystem";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    deleteTodo(id).then((data) => dispatch(deleteTodos(id)));
  };

  const handleUpdate = () => {
    updateTodo({ id: todo.id, body: { completed: true } }).then((data) => updateTodos(data));
  };

  React.useEffect(() => {
    console.log(todo);
  }, [todo]);
  return (
    <Card>
      <Button onClick={() => handleUpdate()}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <TaskTitle>{todo.completed ? <s>{todo.title}</s> : todo.title}</TaskTitle>
      <Button onClick={() => handleDelete(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Card>
  );
};

export default TodoCard;
