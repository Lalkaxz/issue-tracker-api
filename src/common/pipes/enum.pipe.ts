import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

// TODO:
@Injectable()
export class ExpandValidationPipe<T extends Record<string, string>>
  implements PipeTransform
{
  constructor(private readonly allowedEnum: T) {}

  transform(value: any) {
    // Query parameter is optional.
    if (!value) return undefined;

    const values = Array.isArray(value) ? value : value.split(',');
    // Get allowed values, trim and to lower case all.
    const trimmedValues = values.map(v => v.trim());
    const allowedValues = Object.values(this.allowedEnum).map(v =>
      v.toLowerCase()
    );

    // Validate values.
    trimmedValues.forEach(v => {
      if (!allowedValues.includes(v.toLowerCase())) {
        throw new BadRequestException(
          `Invalid value: ${v}. Allowed values: ${allowedValues.join(', ')}`
        );
      }
    });

    return trimmedValues;
  }
}
