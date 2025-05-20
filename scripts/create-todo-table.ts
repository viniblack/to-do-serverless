import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB({
  region: 'us-east-1',
});

const params: DynamoDB.CreateTableInput = {
  TableName: 'Tasks',
  KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
  } else {
    console.log('Tabela criada com sucesso:', data);
  }
});
