import { IsString } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    name: string;

    @IsString()
    imgUrl: string;
}

export class UpdateServiceDto {
    @IsString()
    name?: string;

    @IsString()
    imgUrl?: string;
}

export class ServiceResponseDto {
    id: number;
    name: string;
    imgUrl: string;
}
