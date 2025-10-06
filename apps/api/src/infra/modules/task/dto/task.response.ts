import { Task } from '@core/domain/entities/task';

export class TaskResponse {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly status: string,
    readonly userId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static from(domain: Task): TaskResponse {
    return new TaskResponse(
      domain.id.value,
      domain.title,
      domain.description,
      domain.status,
      domain.userId.value,
      domain.createdAt,
      domain.updatedAt ?? domain.createdAt,
    );
  }
}
