import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDb } from 'config/aws.config';
import { GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  tableName = 'Todos';

  async createTask(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: uuidv4(),
      ...createTodoDto,
      status: 'pending',
      created_at: new Date(),
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: newTodo,
      }),
    );

    return newTodo;
  }

  async getTasks(): Promise<Todo[]> {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );

    return result.Items as unknown as Todo[];
  }

  async getOneTask(id: string): Promise<Todo> {
    const result = await dynamoDb.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );

    if (!result.Item) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return result.Item as Todo;
  }

  async updateTask(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    const existing = await this.getOneTask(id);

    const updatedTodo: Todo = {
      ...existing,
      ...updateTodo,
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: updateTodo,
      }),
    );

    return updatedTodo;
  }

  async deleteTask(id: string): Promise<boolean> {
    await this.getOneTask(id);

    await dynamoDb.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );

    return true;
  }

  // generateUploadUrl
  // completeTask
}
