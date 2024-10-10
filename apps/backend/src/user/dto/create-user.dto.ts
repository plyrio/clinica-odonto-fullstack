import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', required: true })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', required: true})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'Joel da Silva', required: true})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '1970-07-12'})
    @IsNotEmpty()
    @IsDateString()
    birthday?: Date;

    @ApiPropertyOptional({example: 'https://example.com/avatar'})
    @IsOptional()
    @IsString()
    imgUrl?: string;

}
