import { applyDecorators } from "@nestjs/common";
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ForbiddenResponseDto, InternalServerErrorResponseDto, BadRequestErrorResponseDto, UnauthorizedResponseDto } from "../exceptions/dto/error-response.dto";

export function ApiDefaultResponses() {
    return applyDecorators(
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: "Forbidden" }),
        ApiInternalServerErrorResponse({ type: InternalServerErrorResponseDto, description: "Internal server error" }),
        ApiBadRequestResponse({ type: BadRequestErrorResponseDto, description: "Bad request" }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: "Unauthorized" })
    )
}