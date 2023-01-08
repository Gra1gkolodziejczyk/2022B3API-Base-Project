import { Module, forwardRef } from "@nestjs/common";
import { UsersServices } from "./services/user.service";
import { UsersController } from './controllers/user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersServices],
  exports: [UsersServices]
})

export class UserModule {}
