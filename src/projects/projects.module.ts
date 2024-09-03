import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Project } from './entities/project.entity';
import { PaginationModule } from 'src/helpers/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuardService } from 'src/auth/auth-guard/auth-guard.service';

@Module({
  imports: [PaginationModule, UsersModule, TypeOrmModule.forFeature([Task, Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, AuthService, AuthGuardService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
