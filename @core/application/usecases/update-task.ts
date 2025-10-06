import { Task } from '@core/domain/entities/task';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { NotFoundException } from '@core/domain/exceptions/not-found-exception';
import { TaskStatus } from '@core/domain/entities/task';
import { TaskRepository } from '@core/domain/ports/tasks-repository';

export interface UpdateTaskProps {
  id: UniqueId;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    description,
    status,
  }: UpdateTaskProps): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.update({ title, description, status });

    await this.taskRepository.update(task);

    return task;
  }
}
