import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export interface UpdateDoctorDto extends Partial<CreateDoctorDto> {
    
}
