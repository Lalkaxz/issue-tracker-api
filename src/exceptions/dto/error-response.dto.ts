import { HttpException } from "@nestjs/common";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class BadRequestErrorResponseDto {
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  @ApiProperty({ example: "User already registered" })
  readonly message: string;

  @ApiProperty({ example: "Bad Request" })
  readonly error: string;
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

  @ApiProperty({ example: "Internal server error" })
  readonly message: string;

  @ApiProperty({ example: "Internal Server Error" })
  readonly error: string;
}

