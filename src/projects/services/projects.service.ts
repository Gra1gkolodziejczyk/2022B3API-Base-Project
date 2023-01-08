import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersServices } from "../../users/services/user.service";
import { Role } from "../../users/user.entity";
import { CreateProjectDto } from "../dto/project.dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectsServices {
  constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
    private readonly usersServices: UsersServices
	) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const userRole = (await this.usersServices.findUserById(createProjectDto.referringEmployeeId)).role;
    if (userRole == Role.ADMIN || userRole == Role.PROJECTMANAGER) {
      const project = new Project()
      project.name = createProjectDto.name;
      project.referringEmployeeId = createProjectDto.referringEmployeeId;
      return this.projectRepository.save(project);
    } else {
      throw new UnauthorizedException();
    }
  }

  async getProjectById(id : string) : Promise<Project> {
    return this.projectRepository.findOne({
      where : { id }
    });
  }

  async getAllProjects() : Promise<Project[]> {
    return await this.projectRepository.find();
  }
}
