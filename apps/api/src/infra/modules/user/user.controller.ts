import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import {
  CreateUserUseCase,
  FindUserByIdUseCase,
  FetchAllUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '@core/application/usecases';
import { UniqueId } from '@core/domain/value-objects/unique-id';
import { CreateUserRequest } from './dtos/create-user.request';
import { UserResponse } from './dtos/user.response';
import { UpdateUserRequest } from './dtos/update-user.request';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly fetchAllUsersUseCase: FetchAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() { email, name, password }: CreateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });
    return UserResponse.from(user);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.fetchAllUsersUseCase.execute();
    return users.map(UserResponse.from);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponse> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.findUserByIdUseCase.execute(UniqueId.create(id));
    return UserResponse.from(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserRequest,
  ): Promise<UserResponse> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.updateUserUseCase.execute({
      id: UniqueId.create(id),
      ...data,
    });

    return UserResponse.from(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    await this.deleteUserUseCase.execute(UniqueId.create(id));
  }
}
