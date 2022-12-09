import { Module } from "@nestjs/common";
import { UsersService } from "./services/user.service";
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService],
})

export class UserModule {}
