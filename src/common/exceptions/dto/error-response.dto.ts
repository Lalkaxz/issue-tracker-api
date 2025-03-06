import { HttpException } from "@nestjs/common";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class BadRequestErrorResponseDto {
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  @ApiProperty({ example: "message" })
  readonly message: string;

  @ApiProperty({ example: "Bad Request" })
  readonly error: string;
}

export class ForbiddenResponseDto {
  @ApiProperty({ example: 403 })
  readonly statusCode: number;

  @ApiProperty({ example: "Forbidden resource" })
  readonly message: string;

  @ApiProperty({ example: "Forbidden" })
  readonly error: string;
}

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  readonly statusCode: number;

  @ApiProperty({ example: "Unauthorized" })
  readonly message: string;

}

export class ErrorResponseDto {
  @ApiProperty()
  readonly statuscode: number;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly error: string;
}

export class InternalServerErrorResponseDto {
  @ApiProperty({ example: 500 })
  readonly statusCode: number;

  @ApiProperty({ example: "message" })
  readonly message: string;

  @ApiProperty({ example: "Internal Server Error" })
  readonly error: string;
}

export class NotFoundResponseDto {
  @ApiProperty({ example: 404 })
  readonly statusCode: number;

  @ApiProperty({ example: "message" })
  readonly message: string;

  @ApiProperty({ example: "Not Found" })
  readonly error: string;
}
