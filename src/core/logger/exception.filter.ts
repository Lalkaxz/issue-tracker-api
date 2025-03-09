import {
  ArgumentsHost,
  Catch,
  HttpException,
  Inject,
  LoggerService
} from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    super();
  }

  async catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return;
    }

    await this.logger.error(exception);

    super.catch(exception, host);
  }
}

export const exceptionFilter = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter
};
