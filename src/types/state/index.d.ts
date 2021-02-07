export type TodoStatus = "complete" | "incomplete";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export type Todos = Array<Todo>;
