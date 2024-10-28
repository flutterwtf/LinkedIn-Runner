import ipRoyalConfig from '@common/configs/iproyal.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpRoyalService } from './iproyal.service';

@Module({
  imports: [ConfigModule.forFeature(ipRoyalConfig)],
  providers: [IpRoyalService],
  exports: [IpRoyalService],
})
export class IpRoyalModule {}
