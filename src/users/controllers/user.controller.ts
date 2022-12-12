import { Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UsePipes, 
  ValidationPipe,
  UseGuards,
  Request,
  ValidationError,
} from '@nestjs/common';
import loginUserDto from '../dto/login.dto';
import createUserDto from '../dto/user.dto';
import { UsersService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../user.entity';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guards';
import { ValidatorOptions } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
    ) {}

  @Get()
  getAllUsers() {
    return this.UsersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMe(@Request() req) {
    return req.user;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.UsersService.findById(id);
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: createUserDto) {
    return this.UsersService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Body() body: loginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }
}

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
