import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

@Entity()
export class ProjectUser {

  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn("uuid")
  @IsNotEmpty()
  public id!: string;

  @Column()
  public startDate!: Date;
  
  @Column()
  public endDate!: Date;

  @Column("uuid")
  public projectId!: string;

  @Column("uuid")
  public userId!: string;

  @ManyToOne(() => User, (user: User) => user.projectUser)
  public user: User

  @ManyToOne(() => Project, (project: Project) => project.projectUser)
  public project: Project
}
