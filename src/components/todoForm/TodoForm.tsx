import * as React from "react";
import { Input } from "../design/DesignSystem";
import { Field, Form, Formik, FieldProps } from "formik";
import { Todo } from "src/types";

interface TodoFormProps {
  initialValue: Omit<Todo, "id">;
  handleSubmit: (values: Omit<Todo, "id">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValue, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        handleSubmit(values);
      }}
      enableReinitialize={true}
    >
      <Form>
        <Field name="title">
          {({ field, form, meta }: FieldProps) => {
            return (
              <Input
                width="500px"
                value={field.value}
                autoComplete="off"
                name="title"
                id="title"
                data-testid="todo-title-input"
                placeholder="type here..."
                onChange={field.onChange}
              />
            );
          }}
        </Field>
      </Form>
    </Formik>
  );
};

export default TodoForm;
