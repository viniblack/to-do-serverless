import { Injectable } from '@nestjs/common';
import { dynamoDb } from '../../config/aws.config';
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamodbService {
  private tableName = 'Todos';

  async getItemById(id: string) {
    const result = await dynamoDb.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    return result.Item;
  }

  async putItem(item: Record<string, any>) {
    await dynamoDb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
      }),
    );
    return { success: true };
  }

  async getItems() {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );
    return result.Items;
  }

  async DeleteItemCommand(id: string) {
    await dynamoDb.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );

    return { success: true };
  }
}
