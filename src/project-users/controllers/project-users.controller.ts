import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards";

@Controller('/project-users')
  export class ProjectUserController {
  ProjectUserService: any;
    constructor(
      ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProjectUsers() {
    return this.ProjectUserService.getAllProjectUsers();
  }
}
