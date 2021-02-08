import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "api";
import { deleteTodos, updateTodos, load } from "state";
import { Todo } from "types";
import { Button, Card, TaskTitle } from "../design/DesignSystem";
import { functor } from "../../libs/functional";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    functor(id)
      .map((id) => {
        dispatch(load(true));
        return id;
      })
      .chain((id) => deleteTodo(id))
      .then((data) => dispatch(deleteTodos(id)));
  };

  const handleUpdate = () => {
    functor({ id: todo.id, body: { completed: true } })
      .map((data) => {
        dispatch(load(true));
        return data;
      })
      .chain((v) => updateTodo(v))
      .then((data) => updateTodos(data));
  };

  React.useEffect(() => {
    console.log(todo);
  }, [todo]);
  return (
    <Card>
      {!todo.completed && (
        <Button onClick={() => handleUpdate()}>
          <FontAwesomeIcon
            style={{
              color: "green",
            }}
            icon={faCheck}
          />
        </Button>
      )}
      <TaskTitle>{todo.completed ? <s>{todo.title}</s> : todo.title}</TaskTitle>
      <Button onClick={() => handleDelete(todo.id)}>
        <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
      </Button>
    </Card>
  );
};

export default TodoCard;
