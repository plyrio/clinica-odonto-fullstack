import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { DbModule } from 'src/db/db.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DbModule, CommonModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
