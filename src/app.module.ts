import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@common/logger_module/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LinkedInAutomatorModule } from '@app_modules/linkedin_automator_module/linkedin-automator.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    LinkedInAutomatorModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
