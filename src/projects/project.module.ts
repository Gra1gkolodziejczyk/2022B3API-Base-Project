import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectController } from "./controllers/projects.controller";
import { Project } from "./project.entity";
import { ProjectsServices } from "./services/projects.service";
import { UserModule } from "../users/user.module";
import { ProjectUserModule } from "../project-users/project-user.module";
@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule, forwardRef(() => ProjectUserModule)],
  controllers: [ProjectController],
  providers: [ProjectsServices],
  exports: [ProjectsServices],
})

export class ProjectModule {}
