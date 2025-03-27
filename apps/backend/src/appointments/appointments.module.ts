import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { GetOccupiedHoursService } from './get-occuped-hours.service';
import { AppointmentsController } from './appointments.controller';
import { DbModule } from 'src/db/db.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, GetOccupiedHoursService],
  imports: [DbModule, CommonModule],
})
export class AppointmentsModule {}
