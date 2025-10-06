import { PrismaClient } from '@prisma/client';

export abstract class IPrisma extends PrismaClient {}

export { PrismaClient };
