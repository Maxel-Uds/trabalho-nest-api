import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm";
import { PaginationService } from "src/helpers/pagination/pagination.service";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FilterDto } from "src/helpers/pagination/dto/filter.dto";

@Injectable()
export class ProjectsService {
  constructor(
      @InjectRepository(Project)
      private readonly projectRepository: Repository<Project>,
      private readonly paginationService: PaginationService
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(createProjectDto);
  }

  findAllPaginated(filter?: FilterDto) {
    if (!filter) {
      return this.paginationService.paginate(this.projectRepository, {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
      });
    }
      
    return this.paginationService.paginate(this.projectRepository, {
      page: filter.page,
      pageSize: filter.pageSize,
    });
  }    

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOneByOrFail({ id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    await this.projectRepository.delete(id);
  }
}
