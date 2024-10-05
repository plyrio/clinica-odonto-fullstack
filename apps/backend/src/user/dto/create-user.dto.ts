import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDate,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    birthday?: Date;

    @IsOptional()
    @IsString()
    imgUrl?: string;
}
