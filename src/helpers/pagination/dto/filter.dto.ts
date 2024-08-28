import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE = 1;

export class FilterDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'O atributo "page" precisa de ser um número' })
  page: number = DEFAULT_PAGE;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'O atributo "pageSize" precisa de ser um número' })
  pageSize: number = DEFAULT_PAGE_SIZE;
}
