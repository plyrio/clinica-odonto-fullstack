import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {
    private readonly logger = new Logger(CommonService.name);

    public validateDto(schema: any, dto: any): void {
        const validateData = schema.safeParse(dto);
        if (!validateData.sucess) {
          throw new BadRequestException(validateData.error.errors);
        }
      }
    
      public handleError(error: any, message: string): never {
        this.logger.error(error, message);
        throw new InternalServerErrorException(message);
      }
}
