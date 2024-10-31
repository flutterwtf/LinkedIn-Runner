import { registerAs } from '@nestjs/config';

export default registerAs('ipRoyalConfig', () => ({
  apiToken: process.env.IPROYAL_API_KEY,
}));
