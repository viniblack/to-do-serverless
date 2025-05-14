/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedTodo: Partial<Todo>): Todo {
    return this.todosService.update(id, updatedTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.todosService.remove(id);
  }
}
