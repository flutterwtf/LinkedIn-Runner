import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpRoyalModule } from './modules/iproyal_module/iproyal.module';
import { IpRoyalService } from './modules/iproyal_module/iproyal.service';
import { ProxyService } from './proxy.abstract.service';

@Module({
  imports: [ConfigModule.forRoot(), IpRoyalModule],
  providers: [
    {
      provide: ProxyService,
      useClass: IpRoyalService,
    },
  ],
  exports: [ProxyService],
})
export class ProxyModule {}
