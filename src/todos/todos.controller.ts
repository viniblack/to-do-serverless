/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('tasks')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTask(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.getTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.getOneTask(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatedTodo: UpdateTodoDto): Promise<Todo> {
    return this.todosService.updateTask(id, updatedTodo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.todosService.deleteTask(id);
  }
}
