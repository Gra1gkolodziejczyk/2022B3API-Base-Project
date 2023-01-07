import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../../users/services/user.service";
import CreateProjectDto from "../dto/project.dto";
import { Project } from "../project.entity";


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async getAllProjects(token: any): Promise<Project[]> {
    const user = await this.usersService.getInfos(token);
    if(user.role === 'Employee') {
      return await this.projectsRepository.findBy({ referringEmployeeId: user.id });
    } else {
      return await this.projectsRepository.find();
    }
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }
}
