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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuardService } from './auth/auth-guard/auth-guard.service';

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
      // store: redisStore,
      // host: process.env.REDIS_HOST,
      // port: process.env.REDIS_PORT
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    },
  ],
})
export class AppModule { }
