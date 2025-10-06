import { Module } from '@nestjs/common';
import { AdaptersModule } from '../adapters/adapters.module';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from '@core/domain/ports/user-repository';
import { Encrypter } from '@core/application/ports/encrypter';
import { TaskRepository } from '@core/domain/ports';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  FindUserByIdUseCase,
  FetchAllUsersUseCase,
  CreateTaskUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  FindTaskByIdUseCase,
  FetchAllTasksUseCase,
} from '@core/application/usecases';

@Module({
  imports: [AdaptersModule, DatabaseModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (repository: UserRepository, encrypter: Encrypter) => {
        return new CreateUserUseCase(repository, encrypter);
      },
      inject: [UserRepository, Encrypter],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repository: UserRepository) => {
        return new UpdateUserUseCase(repository);
      },
      inject: [UserRepository],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (repository: UserRepository) => {
        return new DeleteUserUseCase(repository);
      },
      inject: [UserRepository],
    },
    {
      provide: FindUserByIdUseCase,
      useFactory: (repository: UserRepository) => {
        return new FindUserByIdUseCase(repository);
      },
      inject: [UserRepository],
    },
    {
      provide: FetchAllUsersUseCase,
      useFactory: (repository: UserRepository) => {
        return new FetchAllUsersUseCase(repository);
      },
      inject: [UserRepository],
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (
        repository: TaskRepository,
        userRepository: UserRepository,
      ) => {
        return new CreateTaskUseCase(repository, userRepository);
      },
      inject: [TaskRepository, UserRepository],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (repository: TaskRepository) => {
        return new UpdateTaskUseCase(repository);
      },
      inject: [TaskRepository],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (repository: TaskRepository) => {
        return new DeleteTaskUseCase(repository);
      },
      inject: [TaskRepository],
    },
    {
      provide: FindTaskByIdUseCase,
      useFactory: (repository: TaskRepository) => {
        return new FindTaskByIdUseCase(repository);
      },
      inject: [TaskRepository],
    },
    {
      provide: FetchAllTasksUseCase,
      useFactory: (repository: TaskRepository) => {
        return new FetchAllTasksUseCase(repository);
      },
      inject: [TaskRepository],
    },
  ],
  exports: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    FetchAllUsersUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindTaskByIdUseCase,
    FetchAllTasksUseCase,
  ],
})
export class UseCasesModule {}
