import { NotFoundException } from '@core/domain/exceptions/not-found-exception';
import { UserRepository } from '@core/domain/ports/user-repository';
import { UniqueId } from '@core/domain/value-objects/unique-id';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userId = new UniqueId(id);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);
  }
}
