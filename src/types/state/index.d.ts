export type TodoStatus = "complete" | "incomplete";

export interface Todo {
  id: string;
  url: string;
  order: number;
  title: string;
  complete: boolean;
}

export type Todos = Array<Todo>;
