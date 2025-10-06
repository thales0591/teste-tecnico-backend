import { Task as DomainTask, TaskStatus } from '@core/domain/entities/task';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { IPrisma } from '../prisma-client';
import { TaskRepository } from '@core/domain/ports/task-repository';
import { Task as PrismaTask } from '../generated/prisma';

export class PrismaTaskRepository extends TaskRepository {
  constructor(private readonly prisma: IPrisma) {
    super();
  }

  async save(entity: DomainTask): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: entity.id.value,
        title: entity.title,
        description: entity.description,
        status: entity.status,
        userId: entity.userId.value,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  async update(entity: DomainTask): Promise<void> {
    await this.prisma.task.update({
      where: { id: entity.id.value },
      data: {
        title: entity.title,
        description: entity.description,
        status: entity.status,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: UniqueId): Promise<void> {
    await this.prisma.task.delete({
      where: { id: id.value },
    });
  }

  async findById(id: UniqueId): Promise<DomainTask | null> {
    const result = await this.prisma.task.findUnique({
      where: { id: id.value },
    });
    return this.taskToDomain(result);
  }

  async findAll(): Promise<DomainTask[]> {
    const results = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return results
      .map((t) => this.taskToDomain(t))
      .filter((t): t is DomainTask => !!t);
  }

  private taskToDomain(task: PrismaTask | null): DomainTask | null {
    if (!task) return null;

    const { id, title, description, status, userId, createdAt, updatedAt } =
      task;

    return DomainTask.create({
      id: UniqueId.create(id),
      title,
      description,
      status: status as TaskStatus,
      userId: UniqueId.create(userId),
      createdAt,
      updatedAt,
    });
  }
}
