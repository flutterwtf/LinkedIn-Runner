import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import linkedinLogicConfig from '@common/configs/linkedin-logic.config';
import { LinkedInLogicAccountsService } from './services/linkedin-logic-accounts.service';

@Module({
  imports: [ConfigModule.forFeature(linkedinLogicConfig)],
  providers: [LinkedInLogicAccountsService],
  exports: [LinkedInLogicAccountsService],
})
export class LinkedInLogicModule {}
