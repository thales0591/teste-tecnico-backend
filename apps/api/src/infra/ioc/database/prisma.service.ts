import { Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@core/infra/prisma-client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('PrismaService.onModuleInit');
  }
}
