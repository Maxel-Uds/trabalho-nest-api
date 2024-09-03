import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm";
import { PaginationService } from "src/helpers/pagination/pagination.service";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FilterDto } from "src/helpers/pagination/dto/filter.dto";
import { UsersService } from "src/users/users.service";
import { plainToClass } from "class-transformer";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
  ) { }

  async create(userEmail: string, createProjectDto: CreateProjectDto) {
    const user = await this.usersService.findOneByOrFail({
      email: userEmail,
    });

    var projectSaved = this.projectRepository.save({
      ...createProjectDto,
      user,
    });

    return plainToClass(Project, projectSaved);
  }

  async findAll(userEmail: string) {
    const user = await this.usersService.findOneBy({ email: userEmail });
    return this.projectRepository.find({ where: { user } });
  }

  async findAllPaginated(userEmail: string, filter?: FilterDto) {
    const user = await this.usersService.findOneBy({ email: userEmail });
    return this.paginationService.paginate(
      this.projectRepository,
      {
        page: filter.page ?? DEFAULT_PAGE,
        pageSize: filter.pageSize ?? DEFAULT_PAGE_SIZE,
      },
      { user },
    );
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.usersService.findOneBy({ email: userEmail });
    return this.projectRepository.findOne({
      where: { id, user },
      relations: { tasks: true },
    });
  }

  async findOrFail(id: number) {
    return await this.projectRepository.findOneOrFail({ where: { id } });
  }

  async update(
    userEmail: string,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const user = await this.usersService.findOneBy({ email: userEmail });
    const project = this.findOne(user.email, id);
    if (!project) {
      throw new NotFoundException();
    }
    return this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    await this.projectRepository.softDelete(id);
  }
}