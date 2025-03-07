import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

import { IssueDto } from '../../issues/dto/issue.dto'
import { UserProfileDto } from '../../users/dto/user-profile.dto'

@Exclude()
export class CommentDto {
	@ApiProperty({
		example: '60c72b2f5f1b2c6d88f8a5b4',
		description: 'Unique comment id'
	})
	@Expose()
	readonly id: string

	@ApiProperty({ example: 'Ty for this issue!', description: 'Comment text' })
	@Expose()
	readonly text: string

	@ApiProperty({
		example: '60c72b2f5f1b2c6d88f8a5b4',
		description: 'Issue id'
	})
	@Expose()
	readonly issueId: string

	@ApiProperty({
		description: 'Issue related to the comment',
		type: IssueDto,
		required: false
	})
	@Expose()
	readonly issue?: IssueDto

	@ApiProperty({
		example: '60c72b2f5f1b2c6d88f8a5b4',
		description: 'Author unique id'
	})
	@Expose()
	readonly authorId: string

	@ApiProperty({
		description: 'Comment author',
		type: UserProfileDto,
		required: false
	})
	@Expose()
	readonly author?: UserProfileDto

	@ApiProperty({
		example: '2025-02-26T12:00:00.000Z',
		description: 'Comment creation date'
	})
	@Expose()
	readonly createdAt: Date

	@ApiProperty({
		example: '2025-02-26T12:30:00.000Z',
		description: 'Comment last update date'
	})
	@Expose()
	readonly updatedAt: Date
}
