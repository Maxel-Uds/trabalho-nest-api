import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../projects/entities/project.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { ProjectsService } from "src/projects/projects.service";
import { plainToClass } from "class-transformer";

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
  ) { }

  async create(userEmail: string, createTaskDto: CreateTaskDto) {
    const user = await this.usersService.findOneBy({ email: userEmail})
    const project = await this.projectsService.findOrFail(createTaskDto.projectId);

    var taskSaved = this.taskRepository.save({
      ...createTaskDto,
      project,
      user,
    });

    return plainToClass(Task, taskSaved);
  }

  async findAll(userEmail: string) {
    const user = await this.usersService.findOneBy({ email: userEmail});

    return this.taskRepository.find({
      relations: ["project"],
      where: { user },
    });
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.usersService.findOneBy({ email: userEmail});

    return this.taskRepository.find({
      where: { id, user },
      relations: ["project"],
    });
  }

  async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersService.findOneBy({ email: userEmail});
    
    const task = this.taskRepository.findOneByOrFail({ id, user });
    if (!task) {
      throw new UnauthorizedException();
    }
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.softDelete(id);
  }
}