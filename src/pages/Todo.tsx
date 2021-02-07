import * as React from "react";
import { TodoCard, TodoForm } from "components";
import { useTrail, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, todosSelector } from "state";
import { nanoid } from "@reduxjs/toolkit";
import { Todo as TodoType } from "types";

const Todo: React.FC = React.memo(() => {
  const todos = useSelector(todosSelector.selectAll);
  const dispatch = useDispatch();
  const trail = useTrail(todos.length, {
    config: { mass: 5, tension: 4000, friction: 200 },
    opacity: 1,
    x: 10,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
  });

  const handleTodoAdd = React.useCallback(
    (value: Omit<TodoType, "id">) => {
      dispatch(addTodo({ id: nanoid(), ...value }));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <TodoForm initialValue={{ title: "", status: "incomplete" }} handleSubmit={handleTodoAdd} />
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={todos[index].id}
          className="todos-trail"
          style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}
        >
          <animated.div style={{ height }}>
            <TodoCard todo={todos[index]} />
          </animated.div>
        </animated.div>
      ))}
    </React.Fragment>
  );
});

export default Todo;
