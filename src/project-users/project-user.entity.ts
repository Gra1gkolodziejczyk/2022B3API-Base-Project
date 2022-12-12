import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  startData!: Date;

  @Column()
  endDate!: Date;
  
  @PrimaryGeneratedColumn("uuid")
  ProjectId!: string;

  @PrimaryGeneratedColumn("uuid")
  userId!: string;
}

