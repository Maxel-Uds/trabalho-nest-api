import { Module } from '@nestjs/common';
import { PaginationService } from './pagination/pagination.service';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  providers: [PaginationService],
  imports: [PaginationModule]
})
export class HelpersModule {}
