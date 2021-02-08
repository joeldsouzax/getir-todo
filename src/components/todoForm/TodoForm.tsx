import * as React from "react";
import { ErrorText, Input } from "../design/DesignSystem";
import { Field, Form, Formik, FieldProps } from "formik";
import * as yup from "yup";
import { Todo } from "src/types";

interface TodoFormProps {
  initialValue: Pick<Todo, "title" | "completed">;
  handleSubmit: (values: Pick<Todo, "title" | "completed">) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialValue, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={yup.object().shape({
        title: yup.string().min(3, "task is too short").required("required!"),
      })}
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
              <React.Fragment>
                <ErrorText>{meta.error && meta.touched ? meta.error : ""}</ErrorText>
                <Input
                  width="100%"
                  value={field.value}
                  autoComplete="off"
                  name="title"
                  id="title"
                  data-testid="todo-title-input"
                  onChange={field.onChange}
                />
              </React.Fragment>
            );
          }}
        </Field>
      </Form>
    </Formik>
  );
};

export default TodoForm;
