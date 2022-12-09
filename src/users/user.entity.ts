import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({nullable: false, unique: true})
  username: string;

  @Column({nullable: false, unique: true})
  email: string;
  
  @Column({nullable: false})
  password: string;

  @Column({ default: "Employee" })
  role: string;
}

