import { registerAs } from '@nestjs/config';

export default registerAs('temporalConfig', () => ({
  grpcEndpoint: process.env.TEMPORAL_GRPC_ENDPOINT,
  apiKey: process.env.TEMPORAL_API_KEY,
  namespace: process.env.TEMPORAL_NAMESPACE,
  taskQueue: process.env.TEMPORAL_TASK_QUEUE,
}));
