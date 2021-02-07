import * as React from "react";
import { Box, Input, Button } from "../design/DesignSystem";
import { useSpring, animated } from "react-spring";

const AnimatedBox = animated(Box);

const TodoForm: React.FC = () => {
  const [isAdding, setIsAdding] = React.useState<boolean>(false);
  const props = useSpring({});
  return (
    <AnimatedBox style={props}>
      <Input
        style={{ width: "100%" }}
        onChange={() => setIsAdding(true)}
        placeholder="Write your todo here..."
      />
      <Button>Add</Button>
    </AnimatedBox>
  );
};

export default TodoForm;
