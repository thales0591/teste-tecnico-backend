import { UserRepository } from '@core/domain/ports/user-repository';
import { User as DomainUser } from '@core/domain/entities/user';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { IPrisma } from '../prisma-client';
import { User as PrismaUser } from '../generated/prisma';

export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: IPrisma) {
    super();
  }

  async save(entity: DomainUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: entity.id.value,
        name: entity.name,
        email: entity.email,
        password: entity.hashedPassword,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  async update(entity: DomainUser): Promise<void> {
    await this.prisma.user.update({
      where: { id: entity.id.value },
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.hashedPassword,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: UniqueId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.value },
    });
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
    });
    return this.userToDomain(result);
  }

  async findById(id: UniqueId): Promise<DomainUser | null> {
    const result = await this.prisma.user.findUnique({
      where: { id: id.value },
    });
    return this.userToDomain(result);
  }

  async findAll(): Promise<DomainUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users
      .map((u) => this.userToDomain(u))
      .filter((u): u is DomainUser => !!u);
  }

  private userToDomain(user: PrismaUser | null): DomainUser | null {
    if (!user) return null;

    const { id, name, email, password, createdAt, updatedAt } = user;

    return DomainUser.create({
      id: UniqueId.create(id),
      name,
      email,
      password,
      createdAt,
      updatedAt,
    });
  }
}
