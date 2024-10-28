import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import erpConfig from '@common/configs/erp.config';
import { ErpAccountsService } from './services/erp-accounts.service';

@Module({
  imports: [ConfigModule.forFeature(erpConfig)],
  providers: [ErpAccountsService],
  exports: [ErpAccountsService],
})
export class ErpModule {}
