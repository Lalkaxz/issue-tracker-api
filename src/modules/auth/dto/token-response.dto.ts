import { ApiProperty } from '@nestjs/swagger'

export class TokenResponseDto {
	@ApiProperty({
		type: String,
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
	})
	readonly token: string
}
