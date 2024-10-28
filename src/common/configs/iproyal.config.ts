import { registerAs } from '@nestjs/config';

export default registerAs('ipRoyalConfig', () => ({
  hostUrl: process.env.IPROYAL_HOST_URL,
  apiToken: process.env.IPROYAL_API_KEY,
}));
