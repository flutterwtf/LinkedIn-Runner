import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@common/logger_module/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LinkedInRunnerModule } from 'src/linkedin_runner_module/linkedin-runner.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), LoggerModule, LinkedInRunnerModule],
})
export class AppModule {}
