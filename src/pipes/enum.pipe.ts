import { Injectable, BadRequestException, PipeTransform, } from "@nestjs/common";
import { Expand } from "src/users/users.enum";

// TODO:
@Injectable()
export class ExpandValidationPipe implements PipeTransform { 
  transform(value: any) {
    // Query parameter is optional.
    if (!value) return undefined;
    
    const values = Array.isArray(value) ? value : [value];
    // Get allowed values, trim and to lower case all.
    const trimmedValues = values.map((v) => v.trim());
    const allowedValues = Object.values(Expand).map((v) => v.toLowerCase());

    // Validate values.
    trimmedValues.forEach((v) => {
      if (!allowedValues.includes(v.toLowerCase())) {
        throw new BadRequestException(`Invalid value: ${v}. Allowed values: ${allowedValues.join(', ')}`);
      }
    })

    return trimmedValues;
  }
}