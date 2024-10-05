import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';

@Module({
  imports: [UserModule, DoctorModule, SpecialitiesModule, AppointmentsModule, ServicesModule, BlogPostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
