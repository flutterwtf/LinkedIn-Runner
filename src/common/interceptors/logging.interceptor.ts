import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode;
        const duration = Date.now() - start;
        const message = `${method} ${url} ${status} - ${duration}ms`;

        this.logger.log(message);
      }),
    );
  }
}
