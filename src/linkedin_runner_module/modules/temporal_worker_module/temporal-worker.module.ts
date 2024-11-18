import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { bundleWorkflowCode, NativeConnection, Runtime } from '@temporalio/worker';
import { TemporalModule as NestTemporalModule } from 'nestjs-temporal';
import temporalConfig from '@common/configs/temporal.config';
import path from 'path';
import { activitiesBundle } from '@linkedin_runner_module/temporal/activities/activities.bundle';

@Module({
  imports: [
    ConfigModule.forFeature(temporalConfig),
    NestTemporalModule.registerWorkerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const grpcEndpoint = configService.getOrThrow<string>('temporalConfig.grpcEndpoint');
        const apiKey = configService.getOrThrow<string>('temporalConfig.apiKey');
        const namespace = configService.getOrThrow<string>('temporalConfig.namespace');
        const taskQueue = configService.getOrThrow<string>('temporalConfig.taskQueue');

        Runtime.install({});

        const connection = await NativeConnection.connect({
          apiKey,
          tls: {},
          address: grpcEndpoint,
          metadata: {
            'temporal-namespace': namespace,
          },
        });

        const bundle = await bundleWorkflowCode({
          workflowsPath: require.resolve('../../logic/workflows/page-manipulation.workflow'),
          webpackConfigHook: (config) => ({
            ...config,
            resolve: {
              ...config.resolve,
              alias: {
                ...config.resolve?.alias,
                '@common': path.resolve(__dirname, '../../../common'),
                '@core_modules': path.resolve(__dirname, '../../../core_modules'),
                '@linkedin_runner_module': path.resolve(
                  __dirname,
                  '../../../linkedin_runner_module',
                ),
              },
            },
          }),
        });

        return {
          workerOptions: {
            connection,
            namespace,
            taskQueue,
            workflowBundle: bundle,
          },
          activityClasses: activitiesBundle,
        };
      },
    }),
  ],
})
export class TemporalWorkerModule {}
