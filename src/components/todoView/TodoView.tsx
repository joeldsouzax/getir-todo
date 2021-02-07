import * as React from "react";
import { useTrail, animated } from "react-spring";
import { Todo } from "types";
import { TodoCard } from "..";

interface TodoViewProps {
  todos: Array<Todo>;
}

const TodoView: React.FC<TodoViewProps> = ({ todos }) => {
  const trail = useTrail(todos.length, {
    config: { mass: 5, tension: 4000, friction: 200 },
    opacity: 1,
    x: 10,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <React.Fragment>
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
};

export default TodoView;
