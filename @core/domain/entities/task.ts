import { AggregateRoot } from './aggregate-root';
import { UniqueId } from '../value-objects/unique-id';
import { DomainException } from '../exceptions/domain-exception';
import { StringValidator } from '../validators/strings-validator';

export const TaskStatus = {
  PENDING: 'PENDING',
  DONE: 'DONE',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface TaskProps {
  id?: UniqueId;
  title: string;
  description: string;
  status?: TaskStatus;
  userId: UniqueId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task extends AggregateRoot {
  private _title: string;
  private _description: string;
  private _status: TaskStatus;
  private _userId: UniqueId;

  private constructor(
    id: UniqueId,
    title: string,
    description: string,
    status: TaskStatus,
    userId: UniqueId,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id);

    this._title = title;
    this._description = description;
    this._status = status;
    this._userId = userId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  static create({
    id,
    title,
    description,
    status,
    userId,
    createdAt,
    updatedAt,
  }: TaskProps): Task {
    return new Task(
      id || UniqueId.create(),
      title,
      description,
      status ?? TaskStatus.PENDING,
      userId,
      createdAt || new Date(),
      updatedAt || new Date(),
    );
  }

  protected validate(): void {
    StringValidator.isNotEmptyOrThrows('title', this._title);
    StringValidator.isNotEmptyOrThrows('description', this._description);

    const allowedStatuses = Object.values(TaskStatus);
    if (!allowedStatuses.includes(this._status)) {
      throw new DomainException(`Invalid status: ${this._status}`);
    }
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get userId(): UniqueId {
    return this._userId;
  }

  update(props: Partial<Omit<TaskProps, 'id' | 'userId' | 'createdAt'>>) {
    if (props.title) {
      StringValidator.isNotEmptyOrThrows('title', props.title);
      this._title = props.title;
    }

    if (props.description) {
      StringValidator.isNotEmptyOrThrows('description', props.description);
      this._description = props.description;
    }

    if (props.status) {
      const allowedStatuses = Object.values(TaskStatus);
      if (!allowedStatuses.includes(props.status)) {
        throw new DomainException(`Invalid status: ${props.status}`);
      }
      this._status = props.status;
    }

    this.touch();
  }

  markAsDone(): void {
    this._status = TaskStatus.DONE;
    this.touch();
  }

  markAsPending(): void {
    this._status = TaskStatus.PENDING;
    this.touch();
  }

  private touch() {
    this._updatedAt = new Date();
  }
}
