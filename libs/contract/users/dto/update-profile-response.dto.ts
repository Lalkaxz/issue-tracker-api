import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message',
    example: 'Dispay name updated succesfully'
  })
  readonly message: string;
}
