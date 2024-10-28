import { registerAs } from '@nestjs/config';

export default registerAs('fibery', () => ({
  host: process.env.FIBERY_HOST_URL,
  token: process.env.FIBERY_TOKEN,
}));
