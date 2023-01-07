import {
  Body,
  Controller, 
  Get, 
  Post, 
  Request, 
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { AuthService } from '../../auth/services/auth.service';
import CreateProjectDto from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';
import { UsersService } from '../../users/services/user.service';
import loginUserDto from '../../users/dto/login.dto';

@Controller('projects')
  export class ProjectsController {
    constructor(
      private authService: AuthService,
      private userService: UsersService,
      private projectsService: ProjectsService,
      ) {}
      
      @UseGuards(JwtAuthGuard)
      @Get('/')
      getAllProjects(@Body() body: loginUserDto, @Request() request) {
        return this.projectsService.getAllProjects(request.user);
      }

      @UseGuards(JwtAuthGuard)
      @Post('/')
      createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.createProject(createProjectDto);
      }
}
