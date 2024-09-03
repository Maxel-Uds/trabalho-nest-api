import { Exclude } from "class-transformer";
import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: "firstName", nullable: false})
    firstName: string;
    @Column({name: "lastName", nullable: false})
    lastName: string;
    @Column({name: "email", nullable: false})
    email: string;
  
    @Column({name: "password", nullable: false})
    password: string;
    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
