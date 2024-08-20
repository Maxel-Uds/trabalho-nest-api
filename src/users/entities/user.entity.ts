import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: "firstName", nullable: false})
    firtsName: string;
    @Column({name: "lastName", nullable: false})
    lastName: string;
    @Column({name: "email", nullable: false})
    email: string;
    @Column({name: "senha", nullable: false})
    senha: string;
    projects: Project[];
    tasks: Task[];
}