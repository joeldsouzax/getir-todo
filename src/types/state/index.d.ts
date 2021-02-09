export type Visibility = "all" | "completed" | "incomplete";

export interface Todo {
  id: string;
  url: string;
  order: number;
  title: string;
  completed: boolean;
}

export type Todos = Array<Todo>;
