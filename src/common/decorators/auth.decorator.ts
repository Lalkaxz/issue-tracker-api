import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards/jwt-auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(AuthGuard));
}
