import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SpecialitiesModule } from './specialties/specialties.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { DbModule } from './db/db.module';
import { EmployeeModule } from './employee/employee.module';
import { CommonService } from './common/common.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, SpecialitiesModule, AppointmentsModule, ServicesModule, BlogPostsModule, DbModule, EmployeeModule, AuthModule],
  controllers: [AppController,],
  providers: [AppService, CommonService],
})
export class AppModule {}
