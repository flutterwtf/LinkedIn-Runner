import { Module } from '@nestjs/common';
import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { ProxyModule } from '@core_modules/proxy_module/proxy.module';
import { FiberyModule } from '@core_modules/fibery_module/fibery.module';
import { BrowserService } from './services/browser.service';
import { ConnectionService } from './services/schedulers/connection.service';
import { TemporalConnectionModule } from './modules/temporal_connection_module/temporal-connection.module';
import { activitiesBundle } from './temporal/activities/activities.bundle';
import { LinkedInLogicModule } from './modules/linkedin_logic_module/linkedin-logic.module';

@Module({
  imports: [
    TemporalConnectionModule,
    LinkedInLogicModule,
    FiberyModule,
    PuppeteerModule,
    ProxyModule,
  ],
  providers: [ConnectionService, BrowserService, ...activitiesBundle],
})
export class LinkedInAutomatorModule {}
