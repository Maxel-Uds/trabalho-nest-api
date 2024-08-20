import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService],
})
export class TasksModule {}
