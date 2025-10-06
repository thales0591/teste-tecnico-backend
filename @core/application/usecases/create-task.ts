import { Task, TaskStatus } from '@core/domain/entities/task';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { TaskRepository } from '@core/domain/ports/task-repository';
import { UserRepository } from '@core/domain/ports';
import { NotFoundException } from '@nestjs/common';

export interface CreateTaskProps {
  title: string;
  description: string;
  userId: UniqueId;
}

export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    title,
    description,
    userId,
  }: CreateTaskProps): Promise<Task> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

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
