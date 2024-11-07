import { Injectable, BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class CommonService {
  validateDto(schema: any, dto: any): void {
    const validateData = schema.safeParse(dto);

    if (!validateData.success) { // Verifica o sucesso da validação
      // Lança uma exceção com a mensagem de erro detalhada se houver falha na validação
      const errors = (validateData.error as ZodError)?.errors || [];
      throw new BadRequestException(errors.length > 0 ? errors : 'Validation failed');
    }
  }

  handleError(error: any, message: string): void {
    // Método para tratar erros específicos da aplicação
    throw new BadRequestException(`${message}: ${error.message}`);
  }
}