/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/lambda.ts
import { Handler, Context, Callback } from 'aws-lambda';
import { createNestServer } from './main';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await createNestServer();
  await app.init();
  return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
