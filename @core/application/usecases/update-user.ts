import { User } from '@core/domain/entities/user';
import { NotFoundException } from '@core/domain/exceptions/not-found-exception';
import { UserRepository } from '@core/domain/ports/user-repository';
import { UniqueId } from '@core/domain/value-objects/unique-id';

export interface UpdateUserProps {
  id: UniqueId;
  email?: string;
  name?: string;
  password?: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, email, name, password }: UpdateUserProps): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.update({
      email,
      name,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
