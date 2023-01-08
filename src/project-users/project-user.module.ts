import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUserController } from "./controllers/project-users.controller";
import { ProjectUser } from "./project-user.entity";
import { ProjectUserServices } from "./services/project-users.service";
import { UserModule } from "../users/user.module";
import { ProjectModule } from '../projects/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), UserModule, forwardRef(() => ProjectModule)],
  providers: [ProjectUserServices],
  controllers: [ProjectUserController],
  exports: [ProjectUserServices],
})
export class ProjectUserModule {}
