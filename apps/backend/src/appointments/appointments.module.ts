import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DbModule } from 'src/db/db.module';


@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [DbModule]
})
export class AppointmentsModule {}
