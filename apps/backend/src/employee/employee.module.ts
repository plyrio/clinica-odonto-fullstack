import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { DbModule } from 'src/db/db.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DbModule, CommonModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
