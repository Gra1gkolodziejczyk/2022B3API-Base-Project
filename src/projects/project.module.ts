import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ProjectsController } from "./controllers/projects.controller";
import { Project } from "./project.entity";
import { ProjectsService } from "./services/projects.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => AuthModule), 
    UserModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})

export class ProjectModule {}
