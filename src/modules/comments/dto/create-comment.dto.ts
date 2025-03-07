import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty({
		example: 'Ty for this issue!',
		description: 'Comment text, max 1000 symbols.',
		maxLength: 2000
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	readonly text: string
}
