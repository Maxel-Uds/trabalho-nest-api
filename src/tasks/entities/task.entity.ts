import { Project } from "src/projects/entities/project.entity";

export class Task {
	id: number;
	name: string;
	description: string;
    createdAt: Date;
	closedAt: Date;
    project: Project;
	status: TaskStatus;
}

enum TaskStatus {
	pending = 'pending',
	completed = 'completed'
}
