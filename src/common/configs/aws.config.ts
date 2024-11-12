import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  secretKey: process.env.AWS_SECRET_KEY,
  accessKey: process.env.AWS_ACCESS_KEY,
}));
