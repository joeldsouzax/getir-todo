import { AjaxFunction } from "src/libs/ajax";
import { Todo } from "src/types";
import ajax from "./ajax";

export const getTodos: AjaxFunction<Array<Todo>> = () => ajax("/todos");

export const createTodo: AjaxFunction<Todo> = (value) =>
  ajax("/todos", { method: "POST", body: value });

export const updateTodo: AjaxFunction<Todo> = (value) =>
  ajax("/todos", { method: "PATCH", body: value });

export const deleteTodo: AjaxFunction<Todo> = () => ajax("/todos", { method: "DELETE" });
