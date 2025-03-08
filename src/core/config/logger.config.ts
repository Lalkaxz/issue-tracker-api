import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Options } from 'pino-http';
import { isDevEnv } from 'src/common/utils/is-dev.util';

export const httpConfiguration: Options = {
  autoLogging: false,
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      params: req.params,
      query: req.query,
      body: req.body
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode
    })
  },
  transport: {
    targets: [
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: process.env.LOG_FILE_PATH,
          translateTime: 'dd.mm.yyyy, HH:MM:ss.l'
        }
      },
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'dd.mm.yyyy, HH:MM:ss.l',
          ignore: 'pid,hostname,context,req,res',
          singleLine: true
        }
      }
    ]
  }
};

export const optionsFactory = async (configService: ConfigService) => {
  const options = {
    pinoHttp: { ...httpConfiguration }
  };
  if (options.pinoHttp.transport && options.pinoHttp.transport.options) {
    options.pinoHttp.transport.options.ignore = !isDevEnv(configService)
      ? 'pid,hostname,context,req,res'
      : '';
  }
  return options;
};
