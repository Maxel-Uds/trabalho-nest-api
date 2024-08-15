import { Task } from "src/tasks/entities/task.entity";

export class Project {
    name: string;
    decription: string;
    tasks: Task[];
}
