import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const isLocal = !!process.env.AWS_ENDPOINT;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: isLocal ? process.env.AWS_ENDPOINT : undefined,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const dynamoDb = DynamoDBDocumentClient.from(client);
