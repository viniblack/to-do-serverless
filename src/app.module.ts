import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DynamodbService } from './dynamodb/dynamodb.service';
import { DynamodbModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [TodosModule, DynamodbModule],
  controllers: [AppController],
  providers: [AppService, DynamodbService],
})
export class AppModule {}
