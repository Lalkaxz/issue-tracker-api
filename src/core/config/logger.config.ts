import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import { isDevEnv } from 'src/common/utils/is-dev.util';
import { format, transports } from 'winston';

export const winstonFactory = async (
  config: ConfigService
): Promise<WinstonModuleOptions> => {
  const options: WinstonModuleOptions = {
    level: !isDevEnv(config) ? 'info' : 'debug',
    transports: [
      new transports.File({
        filename: config.getOrThrow<string>('LOG_FILE_PATH'),
        level: 'error',
        format: format.combine(format.timestamp(), format.json())
      })
    ]
  };

  return options;
};
