import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter  {
  constructor(private readonly logger: PinoLogger) {
    super();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    // Get response and request from execution context.
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // Get all values for logging.
    const {method, url, ip} = req;
    const message = exception.message
    const pid = process.pid;
    const statusCode = exception.getStatus();

    this.logger.error(
        `[Nest] ${pid}     LOG ${ip} {${url}, ${method}} ${statusCode} - ${message}`
    )
    
    // Hide error message in internal server exceptions.
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
        res.status(statusCode)
          .json({
            message: "Internal Server Error",
            statusCode: statusCode
          })
    } else {
        super.catch(exception, host);
    }
  }
}

export const exceptionFilter = {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
}
