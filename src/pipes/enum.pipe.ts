import { Injectable, BadRequestException, PipeTransform } from "@nestjs/common";
import { Expand } from "src/users/users.enum";

// WIP
@Injectable()
export class ExpandValidationPipe implements PipeTransform { 
  transform(value: any) {
    if (!value) return undefined;
      
    const values = Array.isArray(value) ? value : [value];
    const trimmedValues = values.map((v) => v.trim());

    const allowedValues = Object.values(Expand);

    trimmedValues.forEach((v) => {
      if (!Object.values(Expand).includes(v)) {
        throw new BadRequestException(`Invalid value: ${v}. Allowed values: ${allowedValues.join(', ')}`);
      }
    })

    return trimmedValues;
  }
}