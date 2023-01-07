import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectUser } from "../../project-users/project-user.entity";
import { Project } from "../project.entity";


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectsRepository.find();
  }
}
