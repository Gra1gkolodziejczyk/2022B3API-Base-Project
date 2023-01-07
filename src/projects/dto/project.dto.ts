import { IsNotEmpty, IsString } from "class-validator";

export default class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  referringEmployeeId!: string;
}
