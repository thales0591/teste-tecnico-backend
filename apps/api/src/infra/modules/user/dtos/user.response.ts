import { User } from '@core/domain/entities/user';

export class UserResponse {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static from(domain: User): UserResponse {
    return new UserResponse(
      domain.id.value,
      domain.email,
      domain.name,
      domain.createdAt,
      domain.updatedAt ?? domain.createdAt,
    );
  }
}
