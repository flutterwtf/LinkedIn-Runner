import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SOURCE } from '../logging/source';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const info = {
      method: req.method,
      originalUrl: req.originalUrl,
      headers: req.headers,
      body: req.body,
      toString: () => JSON.stringify(info),
    };
    this.logger.log(
      {
        message: 'Request',
        info,
      },
      SOURCE.loggerMiddleware,
    );

    if (next) {
      next();
    }
  }
}
