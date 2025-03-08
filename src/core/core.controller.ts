import { CORE_CONTROLLER, CORE_ROUTES } from '@app/contract';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller(CORE_CONTROLLER)
export class CoreController {
  @ApiOperation({ summary: 'Return app status message' })
  @ApiOkResponse({
    example: { status: 'ok' },
    description: 'Return status message'
  })
  @Get(CORE_ROUTES.HEALTH_CHECK)
  health() {
    return { status: 'ok' };
  }
}
