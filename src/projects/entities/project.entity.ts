import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'

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
    @Exclude()
    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn()
    user: User;
}
