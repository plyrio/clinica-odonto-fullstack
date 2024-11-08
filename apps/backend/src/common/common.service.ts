import { Injectable, BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class CommonService {
  validateDto(schema: any, dto: any): void {
    const validateData = schema.safeParse(dto);

    if (!validateData.success) {
      const errors = validateData.error.errors.map(
        (err) => `${err.path.join('.')} - ${err.message}`
      );
      console.log(errors);
      throw new BadRequestException({
        errors,
        message: 'Validation failed',
      }), Error(errors);
    }
  }

  handleError(error: any, message: string): void {
    throw new BadRequestException(`${message}: ${error.message}`);
  }
}