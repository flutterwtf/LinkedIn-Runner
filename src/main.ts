/* eslint-disable @typescript-eslint/no-floating-promises */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { killProcessOnPort } from '@common/utils/kill-process-on-port';
import { winstonConfig } from '@common/configs/winston.config';
import { ValidationPipeOptions } from '@common/configs/validation-pipe.config';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ ...winstonConfig }),
  });
  const PORT = 3003;
  const logger: Logger = app.get(Logger);

  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));
  app.useGlobalFilters(new AppExceptionFilter(logger));

  await killProcessOnPort(PORT, logger);
  await app.listen(PORT, () => {
    logger.log(`Server works on ${PORT}`);
  });
}
bootstrap();
