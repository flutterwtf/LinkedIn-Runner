import { Module } from '@nestjs/common';
import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { ProxyModule } from '@core_modules/proxy_module/proxy.module';
import { BrowserService } from './logic/features/browser.service';
import { TemporalWorkerModule } from './modules/temporal_worker_module/temporal-worker.module';
import { activitiesBundle } from './temporal/activities/activities.bundle';
import { AdditionalPageService } from './logic/features/additional-page.service';

@Module({
  imports: [TemporalWorkerModule, PuppeteerModule, ProxyModule],
  providers: [BrowserService, AdditionalPageService, ...activitiesBundle],
})
export class LinkedInRunnerModule {}
