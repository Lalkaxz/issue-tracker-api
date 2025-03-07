import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PinoLogger } from 'nestjs-pino'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly logger: PinoLogger) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// Get response and request from execution context.
		const ctx = context.switchToHttp()
		const req = ctx.getRequest<Request>()
		const res = ctx.getResponse<Response>()

		// Get all values for logging.
		const { method, url, ip } = req
		const start = Date.now()
		const pid = process.pid

		return next.handle().pipe(
			tap(() => {
				// Log only responses without exceptions.
				const statusCode = res.statusCode
				const duration = Date.now() - start

				this.logger.info(
					`[Nest] ${pid}     LOG ${ip} {${url}, ${method}} ${statusCode} +${duration}ms`
				)
			})
		)
	}
}
