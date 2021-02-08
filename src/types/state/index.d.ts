export type TodoStatus = "complete" | "incomplete";

export interface Todo {
  id: string;
  url: string;
  order: number;
  title: string;
  completed: boolean;
}

export type Todos = Array<Todo>;
