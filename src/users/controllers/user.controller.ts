import { Controller, Get, Param, Post, UseGuards, Request, UsePipes, ValidationPipe, Body, ParseUUIDPipe, NotFoundException, ParseIntPipe, BadRequestException } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards";
import { LocalAuthGuard } from "../../auth/guards/local-auth.guards";
import { AuthService } from "../../auth/services/auth.service";
import { CreateUserDto } from "../dto/user.dto";
import { LoginUserDto } from "../dto/login.dto";
import { UsersServices } from "../services/user.service";
import * as dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

@Controller('users')
export class UsersController {
	constructor(
		private userServices: UsersServices,
		private authService: AuthService
	) {}

	@UsePipes(ValidationPipe)
	@Post('auth/sign-up')
	async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
		return await this.userServices.createUser(createUserDto);
	}
	
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Body() loginUserDto: LoginUserDto) {
		if (this.authService.validateUser(loginUserDto.email, loginUserDto.password)) {
			return this.authService.login(await this.userServices.findUserByEmail(loginUserDto.email));
		}
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	getSelfData(@Request() req) {
		return req.user;
	}

	@Get(':id')
	async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
		let user = await this.userServices.getUserById(id);
		if (user) {
			return user
		} else {
			throw new NotFoundException();
		}
	}

	projectDay(month: number) : number {
		let dayMonth = dayjs().month(month);
		const daysInMonth = dayMonth.daysInMonth();
		let count = 0;
		for (let i = 1; i <= daysInMonth; i++) {
			const day = dayjs().date(i).month(month).day();
			if (day != 0 && day != 6)
				count++;
		}
		return count;
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	getAllUsers() {
		return this.userServices.getAllUsers();
	}
}
