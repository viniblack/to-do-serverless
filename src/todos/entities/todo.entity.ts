export type TodoStatus = 'pending' | 'done';

export class Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  created_at: Date;
}
