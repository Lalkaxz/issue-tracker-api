import { ApiProperty } from '@nestjs/swagger';
import { Comment, Issue, Project } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserProfileDto {
  @ApiProperty({ type: String, description: 'Unique id' })
  @Expose()
  readonly id: string;

  @ApiProperty({ type: String, description: 'Unique user name' })
  @Expose()
  readonly name: string;

  @ApiProperty({ type: String, description: 'User display name' })
  @Expose()
  readonly displayName: string;

  @ApiProperty({ type: [String], description: 'User roles' })
  @Expose()
  readonly roles: string[];

  @ApiProperty({ default: [], description: 'User comments', required: false })
  @Expose()
  readonly comments?: Comment[];

  @ApiProperty({ default: [], description: 'User issues', required: false })
  @Expose()
  readonly issues?: Issue[];

  @ApiProperty({ default: [], description: 'User projects', required: false })
  @Expose()
  readonly projects?: Project[];

  @ApiProperty({
    type: Date,
    description: 'User creation date',
    example: '2025-02-26T12:00:00.000Z'
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    type: Boolean,
    description: 'User deactivation status',
    example: false
  })
  @Expose()
  readonly isDeactivated: boolean;

  @ApiProperty({
    type: Date,
    description: 'User deactivation date',
    example: '2025-02-26T12:00:00.000Z',
    required: false
  })
  @Expose()
  readonly deactivatedAt: Date | null;
}
