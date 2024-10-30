import { IsString } from 'class-validator';

export class CreateSpecialityDto {
    @IsString()
    name: string;
}

export class UpdateSpecialityDto {
    @IsString()
    name?: string;
}

export class SpecialityResponseDto {
    id: number;
    name: string;
}
