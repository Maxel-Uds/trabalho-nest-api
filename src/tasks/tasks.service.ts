import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsService } from "src/projects/projects.service";
import { PaginationService } from "src/helpers/pagination/pagination.service";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FilterDto } from "src/helpers/pagination/dto/filter.dto";


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.projectsService.findOne(createTaskDto.projectId)
      .then(project => this.taskRepository.save({ ...createTaskDto, project }))
      .catch(() => { throw new NotFoundException(`Projeto com ID ${createTaskDto.projectId} não encontrado`); });
  }

  findAllPaginated(filter?: FilterDto) {
    if (!filter) {
      return this.paginationService.paginate(this.taskRepository, {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
      });
    }
      
    return this.paginationService.paginate(this.taskRepository, {
      page: filter.page,
      pageSize: filter.pageSize,
    });
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
