import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { DbModule } from 'src/db/db.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DbModule, CommonModule],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
})
export class SpecialitiesModule {}
