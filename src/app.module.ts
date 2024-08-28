import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from './typeorm/modules/config/config.module';
import { PaginationModule } from './helpers/pagination/pagination.module';
import { HelpersModule } from './helpers/helpers.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    ProjectsModule, 
    UsersModule, 
    TasksModule, 
    ConfigModule, 
    PaginationModule, 
    HelpersModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
