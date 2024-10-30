import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialties.service';
import { SpecialitiesController } from './specialties.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
})
export class SpecialitiesModule { }
