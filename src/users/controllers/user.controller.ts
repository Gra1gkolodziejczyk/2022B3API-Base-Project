import { Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UsePipes, 
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import loginUserDto from '../dto/login.dto';
import createUserDto from '../dto/user.dto';
import { UsersService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(
    private readonly UsersService: UsersService,
    ) {}

  @Get()
  @UsePipes(ValidationPipe)
  GetfindAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  GetFindOne(@Param('id') id: number) {
    return this.UsersService.findOne(id);
  }

  @Post("auth/sign-up")
  @UsePipes(ValidationPipe)
  PostCreateUser(@Body() User: createUserDto) {
    return this.UsersService.createUser(User);
  }

  @Post("auth/login")
  @UsePipes(ValidationPipe)
  login(@Body() User: loginUserDto) {
    return this.UsersService.validate(User);
  }
}
