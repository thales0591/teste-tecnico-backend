import { User } from '@core/domain/entities/user';
import { NotFoundException } from '@core/domain/exceptions/not-found-exception';
import { UserRepository } from '@core/domain/ports/user-repository';
import { UniqueId } from '@core/domain/value-objects/unique-id';

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: UniqueId): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
