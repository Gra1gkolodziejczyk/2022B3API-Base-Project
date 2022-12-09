import { IsDefined, IsEmail, IsEmpty } from "class-validator";

export default class loginUserDto {
  @IsDefined()
  @IsEmail()
  @IsEmpty()
  readonly email: string;

  @IsDefined()
  @IsEmail()
  @IsEmpty()
  readonly password: string;
}
