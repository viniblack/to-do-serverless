import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createNestServer() {
  const app = await NestFactory.create(AppModule);
  return app;
}

if (process.env.IS_OFFLINE) {
  void createNestServer().then((app) => app.listen(3000));
}
