/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: uuidv4(),
      ...createTodoDto,
      status: 'pending',
      created_at: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  update(id: string, updateTodo: Partial<Todo>): Todo {
    const todo = this.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    Object.assign(todo, updateTodo);
    return todo;
  }

  remove(id: string): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }

    this.todos.slice(index, 1);
    return true;
  }
}
