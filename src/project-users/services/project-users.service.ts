import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUserService)
    private usersRepository: Repository<ProjectUserService>,
  ) {}

  getAllProjectUsers(): Promise<ProjectUserService[]> {
    return this.usersRepository.find();
  }
}
