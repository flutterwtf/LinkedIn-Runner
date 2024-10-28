import { registerAs } from '@nestjs/config';

export default registerAs('erpConfig', () => ({
  apiToken: process.env.ERP_API_TOKEN,
  hostUrl: process.env.ERP_HOST_URL,
  accountType: process.env.ACCOUNT_TYPE,
}));
