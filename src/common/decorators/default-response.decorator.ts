import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import {
  BadRequestErrorResponseDto,
  ForbiddenResponseDto,
  InternalServerErrorResponseDto,
  UnauthorizedResponseDto
} from '../exceptions/dto/error-response.dto';

export function ApiDefaultResponses() {
  return applyDecorators(
    ApiForbiddenResponse({
      type: ForbiddenResponseDto,
      description: 'Forbidden'
    }),
    ApiInternalServerErrorResponse({
      type: InternalServerErrorResponseDto,
      description: 'Internal server error'
    }),
    ApiBadRequestResponse({
      type: BadRequestErrorResponseDto,
      description: 'Bad request'
    }),
    ApiUnauthorizedResponse({
      type: UnauthorizedResponseDto,
      description: 'Unauthorized'
    })
  );
}
