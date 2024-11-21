import { Module } from '@nestjs/common';
import { CursorUtil } from './utils/cursor-util';
import { BrowserConnectionService } from './browser-connection.service';
import { PageManipulationService } from './page-manipulation.service';

@Module({
  providers: [BrowserConnectionService, PageManipulationService, CursorUtil],
  exports: [BrowserConnectionService, PageManipulationService],
})
export class PuppeteerModule {}
