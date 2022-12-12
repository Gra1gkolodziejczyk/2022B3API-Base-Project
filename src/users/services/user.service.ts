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

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string) : Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findByEmail(email: string): Promise<User> {
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
    const arePasswordEqual = await bcrypt.compare(password, user.password);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
