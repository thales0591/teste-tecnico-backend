import { Module } from '@nestjs/common';
import { Encrypter } from '@core/application/ports/encrypter';
import { BcryptEncrypter } from '@core/infra/adapters/bcrypt-encrypter';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Encrypter,
      useClass: BcryptEncrypter,
    },
  ],
  exports: [Encrypter],
})
export class AdaptersModule {}
