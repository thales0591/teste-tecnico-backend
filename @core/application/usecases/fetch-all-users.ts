import { User } from '@core/domain/entities/user';
import { UserRepository } from '@core/domain/ports/user-repository';

export class FetchAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
