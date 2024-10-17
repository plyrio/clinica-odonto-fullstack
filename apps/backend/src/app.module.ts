import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { DbModule } from './db/db.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [UserModule, DoctorModule, SpecialitiesModule, AppointmentsModule, ServicesModule, BlogPostsModule, DbModule, EmployeeModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
