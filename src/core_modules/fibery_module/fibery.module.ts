import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fiberyConfig from '@common/configs/fibery.config';
import { FiberyDataSource } from './fibery.datasource';
import { FiberyUtils } from './utils/fibery-utils';
import { FiberyLinkedinAutomatorCacheService } from './services/fibery-linkedin-automator-cache.service';
import { FiberyLinkedInAutomatorAccountService } from './services/fibery-linkedin-automator-account.service';

@Module({
  imports: [ConfigModule.forFeature(fiberyConfig)],
  providers: [
    FiberyLinkedinAutomatorCacheService,
    FiberyLinkedInAutomatorAccountService,
    FiberyDataSource,
    FiberyUtils,
  ],
  exports: [FiberyLinkedinAutomatorCacheService],
})
export class FiberyModule {}
