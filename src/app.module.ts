import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@common/logger_module/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LinkedInRunnerModule } from '@app_modules/linkedin_runner_module/linkedin-runner.module';

@Module({
  imports: [LoggerModule, ConfigModule.forRoot(), LinkedInRunnerModule, ScheduleModule.forRoot()],
})
export class AppModule {}
