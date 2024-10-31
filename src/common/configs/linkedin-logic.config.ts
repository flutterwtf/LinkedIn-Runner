import { registerAs } from '@nestjs/config';

export default registerAs('linkedInLogic', () => ({
  apiToken: process.env.LINKEDIN_LOGIC_API_TOKEN,
  hostUrl: process.env.LINKEDIN_LOGIC_HOST_URL,
  accountType: process.env.ACCOUNT_TYPE,
}));
