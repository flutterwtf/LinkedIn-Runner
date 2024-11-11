import { AwsModule } from '@core_modules/aws_module/aws.module';
import { ProxyModule } from '@core_modules/proxy_module/proxy.module';
import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { Module } from '@nestjs/common';
import { PageModule } from './modules/page_module/page.module';
import { TemporalWorkerModule } from './modules/temporal_worker_module/temporal-worker.module';
import { activitiesBundle } from './temporal/activities/activities.bundle';

@Module({
  imports: [TemporalWorkerModule, PageModule, PuppeteerModule, ProxyModule, AwsModule],
  providers: [...activitiesBundle],
})
export class LinkedInRunnerModule {}
