import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  @ApiProperty({ example: "User already registered" })
  readonly message: string;

  @ApiProperty({ example: "Bad Request" })
  readonly error: string;
}
