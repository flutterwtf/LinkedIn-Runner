import { Module } from '@nestjs/common';
import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { ProxyModule } from '@core_modules/proxy_module/proxy.module';
import { FiberyModule } from '@core_modules/fibery_module/fibery.module';
import { ErpModule } from './modules/erp_module/erp.module';
import { BrowserService } from './services/browser.service';
import { ConnectionService } from './services/schedulers/connection.service';
import { TemporalConnectionModule } from './modules/temporal_connection_module/temporal-connection.module';
import { activitiesBundle } from './temporal/activities/activities.bundle';

@Module({
  imports: [TemporalConnectionModule, ErpModule, FiberyModule, PuppeteerModule, ProxyModule],
  providers: [ConnectionService, BrowserService, ...activitiesBundle],
})
export class LinkedInAutomatorModule {}
