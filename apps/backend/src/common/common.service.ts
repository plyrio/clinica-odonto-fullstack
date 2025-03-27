import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class CommonService {
  validateDto(schema: any, dto: any): void {
    const validateData = schema.safeParse(dto);

    if (!validateData.success) {
      const errors = validateData.error.errors.map(
        (err) => `${err.path.join('.')} - ${err.message}`,
      );
      console.log(errors);
      throw new BadRequestException({
        errors,
        message: 'Validation failed',
      });
    }
  }

  handleError(error: any, message: string): void {
    if (error instanceof ZodError) {
      throw new BadRequestException({
        message,
        validationErrors: error.errors.map(
          (err) => `${err.path.join('.')} - ${err.message}`,
        ),
      });
    }

    if (
      error.name === 'QueryFailedError' ||
      error.message.includes('database')
    ) {
      console.error('Database Error:', error);
      throw new InternalServerErrorException(
        `${message}: Database error occurred`,
      );
    }

    console.error('Unhandled Error:', error);
    throw new BadRequestException(`${message}: ${error.message}`);
  }
}
