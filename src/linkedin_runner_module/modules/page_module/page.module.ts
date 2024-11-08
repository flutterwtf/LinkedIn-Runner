import { PuppeteerModule } from '@core_modules/puppeteer_module/puppeteer.module';
import { PageService } from '@linkedin_runner_module/modules/page_module/services/page.service';
import { Module } from '@nestjs/common';
import { OriginalPageService } from './services/original-page.service';
import { AdditionalPageService } from './services/additional-page.service';

@Module({
  imports: [PuppeteerModule],
  providers: [PageService, OriginalPageService, AdditionalPageService],
  exports: [PageService],
})
export class PageModule {}
