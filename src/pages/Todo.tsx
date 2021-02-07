import * as React from "react";
import { TodoCard, TodoForm } from "components";
import { useTrail, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, todosSelector } from "state";
import { nanoid } from "@reduxjs/toolkit";

const Todo: React.FC = () => {
  const todos = useSelector(todosSelector.selectAll);
  const dispatch = useDispatch();
  const trail = useTrail(todos.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    x: 0,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <React.Fragment>
      <TodoForm
        initialValue={{ title: "", status: "incomplete" }}
        handleSubmit={(value) => dispatch(addTodo({ id: nanoid(), ...value }))}
      />
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={todos[index].id}
          className="todos-trail"
          style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}
        >
          <TodoCard style={{ height: String(height) }} todo={todos[index]} />
        </animated.div>
      ))}
    </React.Fragment>
  );
};

export default Todo;
