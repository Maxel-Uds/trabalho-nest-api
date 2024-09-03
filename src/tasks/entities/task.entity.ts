import { Exclude } from "class-transformer";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({name: "name", nullable: false})
	name: string;
	@Column({name: "description", nullable: false})
	description: string;
	@CreateDateColumn({name: "createdAt", nullable: false})
    createdAt: Date;
	@ManyToOne(() => Project, (project) => project.tasks, {
		cascade: true,
		nullable: false,
	})
    project: Project;
	@Column({ name: "status", nullable: false })
	status: TaskStatus;
	@ManyToOne(() => User, (user) => user.tasks)
	@JoinColumn()
	@Exclude()
	user: User;
}

export enum TaskStatus {
	pending = 'pending',
	completed = 'completed'
}