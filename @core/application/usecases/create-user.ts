import { User } from '@core/domain/entities/user';
import { StringValidator } from '@core/domain/validators/strings-validator';
import { ConflictException } from '@core/domain/exceptions/conflict-exception';
import { Encrypter } from '../ports/encrypter';
import { UserRepository } from '@core/domain/ports/user-repository';

export interface CreateUserProps {
  email: string;
  name: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, name, password }: CreateUserProps): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    StringValidator.isEmailOrThrows('email', email);
    StringValidator.isPasswordOrThrows(password);
    StringValidator.isNotEmptyOrThrows('name', name);

    const hashedPassword = await this.encrypter.hash(password);

    const user = User.create({
      email,
      name,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}
