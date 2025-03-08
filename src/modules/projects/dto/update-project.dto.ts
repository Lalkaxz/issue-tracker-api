import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'issue-tracker',
    required: false
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the project (optional)',
    example: 'A project for issue tracking',
    required: false
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;
}
