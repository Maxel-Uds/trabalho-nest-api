import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'

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
}

export enum TaskStatus {
	pending = 'pending',
	completed = 'completed'
}