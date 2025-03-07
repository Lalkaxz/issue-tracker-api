import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { OrderByDto } from 'src/common/dto/order-by.dto'
import { OrderByDirection } from 'src/common/enums/order-by.enum'

@Injectable()
export class OrderByPipe<T extends Record<string, string>>
	implements PipeTransform
{
	constructor(private readonly allowedEnum: T) {}

	transform(value: any): OrderByDto | undefined {
		// Query parameter is optional.
		if (!value) return undefined
		// If is more than one query parameter.
		if (Array.isArray(value)) {
			value = value[0]
		}

		let [field, direction] = value.split(':')

		field = field.trim()
		direction = direction ? direction.trim() : OrderByDirection.ASC // If direction not provided.

		// Get allowed values and directions, to lower case all.
		const allowedValues = Object.values(this.allowedEnum).map(v =>
			v.toLowerCase()
		)
		const allowedDirections = Object.values(OrderByDirection).map(v =>
			v.toLowerCase()
		)

		// Validate field and direction values.
		if (!allowedValues.includes(field.toLowerCase())) {
			throw new BadRequestException(
				`Invalid value: ${field}. Allowed values: ${allowedValues.join(', ')}`
			)
		}

		if (!allowedDirections.includes(direction.toLowerCase())) {
			throw new BadRequestException(
				`Invalid order direction: ${direction}. Allowed values: ${allowedDirections.join(', ')}`
			)
		}

		// Return field value from Enum.
		return {
			field: this.allowedEnum[field.toUpperCase()],
			direction: direction
		}
	}
}
