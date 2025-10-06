import { Task } from '../entities/task';
import { UniqueId } from '../value-objects/unique-id';

export abstract class TaskRepository {
  abstract save(entity: Task): Promise<void>;
  abstract update(entity: Task): Promise<void>;
  abstract delete(id: UniqueId): Promise<void>;
  abstract findById(id: UniqueId): Promise<Task | null>;
  abstract findAll(): Promise<Task[]>;
}
