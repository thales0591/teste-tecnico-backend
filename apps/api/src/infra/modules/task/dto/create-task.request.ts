import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '@core/domain/entities/task';

export class CreateTaskRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
