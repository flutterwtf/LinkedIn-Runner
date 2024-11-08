import { Module } from '@nestjs/common';
import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { ProxyModule } from '@core_modules/proxy_module/proxy.module';
import { TemporalWorkerModule } from './modules/temporal_worker_module/temporal-worker.module';
import { activitiesBundle } from './temporal/activities/activities.bundle';
import { PageModule } from './modules/page_module/page.module';

@Module({
  imports: [TemporalWorkerModule, PageModule, PuppeteerModule, ProxyModule],
  providers: [...activitiesBundle],
})
export class LinkedInRunnerModule {}
