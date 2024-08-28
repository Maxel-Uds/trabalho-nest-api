import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Project } from './entities/project.entity';
import { PaginationModule } from 'src/helpers/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([Task, Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
