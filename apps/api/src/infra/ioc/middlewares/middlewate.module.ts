import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionHandler } from './exception-handler/not-found.filter';
import { ConflictExceptionHandler } from './exception-handler/conflict.filter';
import { BadRequestExceptionHandler } from './exception-handler/bad-request.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionHandler,
    },
  ],
})
export class MiddlewareModule {}
