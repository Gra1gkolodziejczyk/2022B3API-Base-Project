import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, ParseUUIDPipe, Post, Request, UseGuards } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards";
import { RolesGuard } from "../../auth/guards/role.guard";
import { ProjectUserServices } from "../../project-users/services/project-users.service";
import { UsersServices } from "../../users/services/user.service";
import { Role } from "../../users/user.entity";
import { CreateProjectDto } from "../dto/project.dto";
import { ProjectsServices } from "../services/projects.service";

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {

  constructor(
    private usersServices : UsersServices,
    private projectServices: ProjectsServices,
    private projectUserServices : ProjectUserServices,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createProjet(@Body() createProjectDto : CreateProjectDto) {
    return await this.projectServices.createProject(createProjectDto);
  }

  @Get(':id')
  async getProjectById(@Request() req, @Param('id', new ParseUUIDPipe()) id: string) {
    const project = await this.projectServices.getProjectById(id);
    if (project) {
      const user = await this.usersServices.findUserById(req.user.userId);
      const projectUser = user.projectUser.filter(puser => puser.projectId == project.id);
      if (user.role == Role.EMPLOYEE && !projectUser.length) {
        throw new ForbiddenException();
      }
      return project;
    } else {
      throw new NotFoundException();
    }
  }

  @Get()
  async getProjectsByRole(@Request() req) {
    const user = await this.usersServices.findUserById(req.user.userId);
    if (user.role == Role.ADMIN || user.role == Role.PROJECTMANAGER) {
      return await this.projectServices.getAllProjects();
    } else {
      const projectUsers = await this.projectUserServices.getAllProjectUserByUserID(req.user.userId);
      return await Promise.all(
        projectUsers
          .map(projectUser => this.projectServices.getProjectById(projectUser.projectId))
      )
    }
  }

}
