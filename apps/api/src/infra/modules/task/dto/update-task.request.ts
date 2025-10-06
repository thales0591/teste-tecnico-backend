import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@core/domain/entities/task';

export class UpdateTaskRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
