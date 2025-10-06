import { Task, TaskStatus } from '@core/domain/entities/task';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { TaskRepository } from '@core/domain/ports/task-repository';

export interface CreateTaskProps {
  title: string;
  description: string;
  status?: TaskStatus;
  userId: UniqueId;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    title,
    description,
    userId,
  }: CreateTaskProps): Promise<Task> {
    const task = Task.create({
      title,
      description,
      status: 'PENDING',
      userId,
    });

    await this.taskRepository.save(task);

    return task;
  }
}
