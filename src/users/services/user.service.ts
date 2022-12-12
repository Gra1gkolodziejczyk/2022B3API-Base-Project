import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createUserDto from '../dto/user.dto';
import loginUserDto from '../dto/login.dto';
import { User } from '../user.entity';
import * as  bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findUsername(username: string) : Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(user: createUserDto) {
    const newUser = this.usersRepository.create({
      ...user, 
      password:  await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
    });
    return this.usersRepository.save(newUser);
  }

  async validate({ email, password }: loginUserDto): Promise<createUserDto> {
    console.log(email, password)
    const user = await this.usersRepository.findOne({ where: { email }});
    const areEqual = await bcrypt.compare(password, user.password);
    if(!user) {
      throw new UnauthorizedException();
    }
    if (!areEqual) {
     throw console.warn("Wrong Password");
    }
    return user;
  }
}
