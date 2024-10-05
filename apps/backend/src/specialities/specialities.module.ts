import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';

@Module({
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
})
export class SpecialitiesModule {}
