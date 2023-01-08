import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectUser } from '../project-users/project-user.entity';

export enum Role {
	EMPLOYEE = "Employee",
	ADMIN = "Admin",
	PROJECTMANAGER = "ProjectManager"
}

@Entity('user')
export class User {

	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ unique: true })
	public username!: string;

	@Column({ unique: true })
	@IsEmail()
	public email!: string;

	@Column()
	public password!: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.EMPLOYEE
	})
	
	public role!: Role;

	@OneToMany(() => ProjectUser, (puser: ProjectUser) => puser.user)
	public projectUser : ProjectUser[]
}
