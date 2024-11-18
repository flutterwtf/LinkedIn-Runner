import { Module } from '@nestjs/common';
import { CursorService } from './services/mouse/cursor.service';
import { BrowserConnectionService } from './browser-connection.service';
import { PageManipulationService } from './services/page-manipulation.service';
import { MouseControlService } from './services/mouse/mouse-control.service';
import { WindMouseService } from './services/mouse/wind-mouse.service';
import { MouseTargetCalculationService } from './services/mouse/mouse-target-calculation.service';

@Module({
  providers: [
    BrowserConnectionService,
    PageManipulationService,
    CursorService,
    MouseControlService,
    MouseTargetCalculationService,
    WindMouseService,
  ],
  exports: [BrowserConnectionService, PageManipulationService],
})
export class PuppeteerModule {}
