import { PrismaClient } from './generated/prisma';

export abstract class IPrisma extends PrismaClient {}

export { PrismaClient };
