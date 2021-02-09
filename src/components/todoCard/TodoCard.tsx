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

  const handleUpdate = async () => {
    dispatch(load(true));
    const response = await updateTodo({ id: todo.id, body: { ...todo, completed: true } });
    dispatch(updateTodos(response));
  };

  React.useEffect(() => {
    console.log(todo);
  }, [todo]);
  return (
    <Card>
      <Button onClick={() => handleUpdate()}>
        <FontAwesomeIcon
          style={{
            color: "green",
            visibility: todo.completed ? "hidden" : "visible",
          }}
          icon={faCheck}
        />
      </Button>
      <TaskTitle>{todo.completed ? <s>{todo.title}</s> : todo.title}</TaskTitle>
      <Button onClick={() => handleDelete(todo.id)}>
        <FontAwesomeIcon style={{ color: "red" }} icon={faTrash} />
      </Button>
    </Card>
  );
};

export default TodoCard;
