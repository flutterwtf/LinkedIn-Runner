import { Logger } from '@nestjs/common';

export const LoggerProvider = {
  provide: Logger,
  useValue: new Logger(),
};
