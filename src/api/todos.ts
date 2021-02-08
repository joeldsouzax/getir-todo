import { AjaxFunction } from "src/libs/ajax";
import { Todo } from "src/types";
import ajax from "./ajax";

export const fetchAllTodos: AjaxFunction<Array<Todo>> = () => ajax("/todos");

export const createTodo: AjaxFunction<Todo> = (value) =>
  ajax("/todos", { method: "POST", body: value });

export const updateTodo: AjaxFunction<Todo> = (value: any) => {
  return ajax("/todos/" + value.id, { method: "PATCH", body: value.body });
};

export const deleteTodo: AjaxFunction<Todo> = (id) => ajax("/todos/" + id, { method: "DELETE" });
