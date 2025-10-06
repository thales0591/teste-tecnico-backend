import { Module } from '@nestjs/common';
import { UseCasesModule } from '../../ioc/usecases/usecases.module';
import { UserController } from './user.controller';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
})
export class UserModule {}
