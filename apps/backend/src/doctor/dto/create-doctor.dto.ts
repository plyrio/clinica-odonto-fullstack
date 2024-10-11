import { IsInt, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsInt()
    userId: number;
}

export class UpdateDoctorDto {
    @IsOptional()
    @IsInt()
    userId?: number;
}

export class DoctorResponseDto {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
