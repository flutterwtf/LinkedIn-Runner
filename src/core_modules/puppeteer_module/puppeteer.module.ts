import { Module } from '@nestjs/common';
import { CursorUtil } from './utils/cursor-util';
import { BrowserConnectionService } from './browser-connection.service';
import { PageManipulationService } from './page-manipulation.service';
import { MouseControllerService } from './utils/mouse-controller.service';

@Module({
  providers: [
    BrowserConnectionService,
    PageManipulationService,
    MouseControllerService,
    CursorUtil,
  ],
  exports: [BrowserConnectionService, PageManipulationService],
})
export class PuppeteerModule {}
