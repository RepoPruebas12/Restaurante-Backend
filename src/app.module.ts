import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptionSecurityService } from './infrastructure/security/encryption-security/encryption-security.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EncryptionSecurityService],
})
export class AppModule {}
