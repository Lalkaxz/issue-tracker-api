import { ApiProperty } from '@nestjs/swagger'

export class ProjectDto {
	@ApiProperty({
		example: '65f3a9f9e4b0f56a3d9bfe32',
		description: 'Unique project id'
	})
	id: string

	@ApiProperty({
		example: 'issue-tracker-api',
		description: 'Project display name'
	})
	name: string

	@ApiProperty({
		example: 'NestJS REST API with CRUD operations.',
		description: 'Project description',
		required: false
	})
	description: string | null

	@ApiProperty({
		example: 'https://github.com/lalkaxz/issue-tracker-api',
		description: 'URL GitHub-repository'
	})
	repoUrl: string

	@ApiProperty({
		example: '65f3a9f9e4b0f56a3d9bfe45',
		description: 'unique owner id'
	})
	ownerId: string

	@ApiProperty({
		example: '2025-03-05T12:00:00.000Z',
		description: 'Date when the project was created'
	})
	createdAt: Date

	@ApiProperty({
		example: '2025-03-05T12:30:00.000Z',
		description: 'Date when the issue was last updated'
	})
	updatedAt: Date
}
