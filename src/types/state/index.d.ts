export type TodoStatus = "complete" | "incomplete";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}

export type Todos = Array<Todo>;
