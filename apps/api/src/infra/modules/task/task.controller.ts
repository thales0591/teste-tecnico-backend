import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FetchAllTasksUseCase,
  FindTaskByIdUseCase,
  UpdateTaskUseCase,
} from '@core/application/usecases';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { UpdateTaskRequest } from './dto/update-task.request';
import { TaskResponse } from './dto/task.response';
import { CreateTaskRequest } from './dto/create-task.request';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly fetchAllTasksUseCase: FetchAllTasksUseCase,
    private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() body: CreateTaskRequest,
  ): Promise<TaskResponse> {
    const task = await this.createTaskUseCase.execute({
      title: body.title,
      description: body.description,
      userId: UniqueId.create(userId),
    });

    return TaskResponse.from(task);
  }

  @Get()
  async findAll(): Promise<TaskResponse[]> {
    const tasks = await this.fetchAllTasksUseCase.execute();
    return tasks.map(TaskResponse.from);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaskResponse> {
    const task = await this.findTaskByIdUseCase.execute(UniqueId.create(id));
    return TaskResponse.from(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskRequest,
  ): Promise<TaskResponse> {
    const task = await this.updateTaskUseCase.execute({
      id: UniqueId.create(id),
      title: body.title,
      description: body.description,
      status: body.status,
    });
    return TaskResponse.from(task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTaskUseCase.execute(UniqueId.create(id));
  }
}
