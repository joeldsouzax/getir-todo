import * as React from "react";
import { TodoCard } from "components";
import { useTrail, animated } from "react-spring";

const Todo: React.FC = () => {
  const [todos, setTodos] = React.useState<Array<string>>([]);

  const trail = useTrail(todos.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    x: 0,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
  });

  React.useEffect(() => {
    window.setTimeout(() => {
      setTodos(["1", "2", "3", "4", "5", "6", "7"]);
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={todos[index]}
          className="todos-trail"
          style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}
        >
          <TodoCard style={{ height: String(height) }}>{todos[index]}</TodoCard>
        </animated.div>
      ))}
    </React.Fragment>
  );
};

export default Todo;
