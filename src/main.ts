/* eslint-disable @typescript-eslint/no-floating-promises */
import { ValidationPipeOptions } from '@common/configs/validation-pipe.config';
import { winstonConfig } from '@common/configs/winston.config';
import { killProcessOnPort } from '@common/utils/kill-process-on-port';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ ...winstonConfig }),
  });
  const PORT = 3003;
  const logger: Logger = app.get(Logger);

  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));

  await killProcessOnPort(PORT, logger);
  await app.listen(PORT, () => {
    logger.log(`Server works on ${PORT}`);
  });
}
bootstrap();
