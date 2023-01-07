import { IsDate, IsNotEmpty } from "class-validator";

export default class createProjectUserDto {
  @IsNotEmpty()
  @IsDate()
  readonly startDate!: Date;
  @IsNotEmpty()
  @IsDate()
  readonly endDate!: Date;
}
