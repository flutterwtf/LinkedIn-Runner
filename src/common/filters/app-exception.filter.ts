import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { HTTP_STATUS_MESSAGE } from '../constants/http-status-message';
import { IValidationErrorResponse } from '../errors/validation-error.interface';
import { SOURCE } from '../logging/source';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let { message }: { message: string | object } = exception || HTTP_STATUS_MESSAGE.internal;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as IValidationErrorResponse;

      statusCode = exception.getStatus();
      message = errorResponse.message || HTTP_STATUS_MESSAGE.internal;
    }

    if (
      !(exception instanceof ForbiddenException) ||
      (statusCode !== HttpStatus.FORBIDDEN && statusCode !== HttpStatus.BAD_REQUEST)
    ) {
      this.logger.error(exception.message, exception.stack, SOURCE.exceptionFilter);
    }

    return response.status(statusCode).json({
      message,
      error: HttpStatus[statusCode],
      statusCode,
    });
  }
}
