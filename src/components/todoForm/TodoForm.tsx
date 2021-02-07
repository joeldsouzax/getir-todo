import * as React from "react";
import { Box, Input, Button } from "../design/DesignSystem";
import { useFormik } from "formik";
import { Todo } from "src/types";

interface TodoFormProps {
  initialValue: Omit<Todo, "id">;
  handleSubmit: (values: Omit<Todo, "id">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValue, handleSubmit }) => {
  const { values, handleSubmit: onSubmit, handleChange } = useFormik({
    initialValues: initialValue,
    onSubmit: handleSubmit,
  });

  console.log(values);
  return (
    <Box>
      <Input
        autoComplete="off"
        name="title"
        id="todo-title"
        data-testid="todo-title-input"
        placeholder="Write your todo here..."
        onChange={handleChange}
      />
    </Box>
  );
};

export default TodoForm;
