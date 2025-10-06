import { Task } from '@core/domain/entities/task';
import { TaskRepository } from '@core/domain/ports/tasks-repository';

export class FindAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
