import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";

export class User {
    id: number;
    firtsName: string;
    lastName: string;
    email: string;
    senha: string;
    projects: Project[];
    tasks: Task[];
}
