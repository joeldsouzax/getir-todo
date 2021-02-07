import * as React from "react";
import { TodoCard } from "components";
import { useTrail, animated } from "react-spring";

const Todo: React.FC = () => {
  const [todos, setTodos] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    window.setTimeout(() => {
      setTodos(["1", "2", "3", "4", ""]);
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
    </React.Fragment>
  );
};

export default Todo;
