import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}    

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();

    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    const {method, url, ip} = req;
    const start = Date.now();

    const pid = process.pid;

    return next
      .handle()
      .pipe(
        catchError((err) => {
          // WIP
          const statusCode = res.statusCode;
          const duration  = Date.now() - start;

          this.logger.error(
            `[Nest] ${pid}     LOG ${ip} {${method} ${url}} ${statusCode} +${duration}ms`
          )
          return throwError(() => err)
        }),

        tap(() => {
          const statusCode = res.statusCode;
          const duration  = Date.now() - start;

          this.logger.info(
            `[Nest] ${pid}     LOG ${ip} {${method} ${url}} ${statusCode} +${duration}ms`
          )
        }),
      );
  }
}
