import { CORE_CONTROLLER, CORE_ROUTES } from '@app/contract';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CoreService } from './core.service';

@ApiTags('app')
@Controller(CORE_CONTROLLER)
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @ApiOperation({ summary: 'Return app status message' })
  @ApiOkResponse({
    example: { status: 'ok' },
    description: 'Return status message'
  })
  @Get(CORE_ROUTES.HEALTH_CHECK)
  health() {
    return this.coreService.healthCheck();
  }
}
