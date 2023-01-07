import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import internal from 'stream';
import { Repository } from 'typeorm';
import { Project } from '../../projects/project.entity';
import createProjectUserDto from '../dto/project-users.dto';
import { ProjectUser } from '../project-user.entity';

@Injectable()
export class ProjectUserService {
  projectsRepository: ProjectUserService;
  constructor(
    @InjectRepository(ProjectUserService)
    private projectsRepository: Repository<ProjectUserService>,
  ) {}

  getAllProjectUsers(): Promise<ProjectUserService[]> {
    return this.projectsRepository.find();
  }

  findOneBy(ProjectId: string): Promise<ProjectUserService> {
    return this.projectsRepository.findOneBy({ ProjectId });
  }

  async createProject(project: createProjectUserDto) {
    const newProject = this.projectsRepository.createProject({
      ...project, 
    });
    return this.projectsRepository.save(newProject);
  }
}
