import { Controller, Get } from "@nestjs/common";

@Controller('/project-users')
  export class ProjectUserController {
  ProjectUserService: any;
    constructor(
      ) {}

  @Get()
  getAllProjectUsers() {
    return this.ProjectUserService.getAllProjectUsers();
  }
}
