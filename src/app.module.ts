import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import { ProjectModule } from './projects/project.module';
import { Project } from './projects/project.entity';
import { ProjectUserModule } from './project-users/project-user.module';
import { ProjectUser } from './project-users/project-user.entity';
import { UsersController } from './users/controllers/user.controller';
import { ProjectController } from './projects/controllers/projects.controller';
import { ProjectUserController } from './project-users/controllers/project-users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    ProjectUserModule,
  ],
  controllers: [
    UsersController,
    ProjectController,
    ProjectUserController
  ],
  providers: [],
})
export class AppModule {}
