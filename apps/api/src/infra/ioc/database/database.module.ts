import { Module } from '@nestjs/common';
import { IPrisma } from '@core/infra/prisma-client';
import { PrismaService } from './prisma.service';
import { TaskRepository, UserRepository } from '@core/domain/ports';
import { PrismaUserRepository } from '@core/infra/adapters/prisma-user-repository';
import { PrismaTaskRepository } from '@core/infra/adapters/task-repository';

@Module({
  providers: [
    {
      provide: IPrisma,
      useClass: PrismaService,
    },
    {
      provide: UserRepository,
      useFactory: (prisma: IPrisma) => {
        return new PrismaUserRepository(prisma);
      },
      inject: [IPrisma],
    },
    {
      provide: TaskRepository,
      useFactory: (prisma: IPrisma) => {
        return new PrismaTaskRepository(prisma);
      },
      inject: [IPrisma],
    },
  ],
  exports: [UserRepository, TaskRepository, IPrisma],
})
export class DatabaseModule {}
