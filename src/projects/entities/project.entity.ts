import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: "name", nullable: false})
    name: string;
    @Column({name: "description", nullable: false})
    description: string;
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
}
