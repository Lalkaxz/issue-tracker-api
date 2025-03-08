import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'issue-tracker'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the project (optional)',
    example: 'A project for issue tracking',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://github.com/lalkaxz/issue-tracker',
    description: 'GitHub repository URL'
  })
  @IsUrl(
    { host_whitelist: ['github.com'] },
    { message: "repoUrl must be a 'github.com' URL address" }
  )
  @IsNotEmpty()
  repoUrl: string;
}
