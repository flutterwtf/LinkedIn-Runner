import awsConfig from '@common/configs/aws.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
