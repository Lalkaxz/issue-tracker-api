import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return;
    }

    this.logger.error(exception);

    super.catch(exception, host);
  }
}

export const exceptionFilter = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter
};
