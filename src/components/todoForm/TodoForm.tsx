import * as React from "react";
import { Box, Input, Button } from "../design/DesignSystem";
import { useFormik } from "formik";
import { Todo } from "src/types";

interface TodoFormProps {
  initialValue: Omit<Todo, "id">;
  handleSubmit: (values: Omit<Todo, "id">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValue, handleSubmit }) => {
  const { values, handleSubmit: onSubmit } = useFormik({
    initialValues: initialValue,
    onSubmit: handleSubmit,
  });
  return (
    <Box>
      <Input style={{ width: "100%" }} placeholder="Write your todo here..." />
      <Button>Add</Button>
    </Box>
  );
};

export default TodoForm;
