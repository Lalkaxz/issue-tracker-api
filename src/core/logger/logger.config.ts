import { Options } from 'pino-http'

const httpConfiguration: Options = {
      autoLogging: false,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true, 
          translateTime: 'dd.mm.yyyy, HH:MM:ss.l', 
          ignore: 'pid,hostname,context,req,res',
          singleLine: true,
        },
      },
}

export default httpConfiguration;