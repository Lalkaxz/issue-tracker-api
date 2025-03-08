import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDbDto {
  @ApiProperty({
    type: String,
    description: 'User name'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'User display name'
  })
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @ApiProperty({
    type: String,
    description: 'Hash of password'
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string; // Hashed password

  @ApiProperty({
    type: String,
    description: 'Authorization token'
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
