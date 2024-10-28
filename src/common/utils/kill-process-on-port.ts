import { Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function killProcessOnPort(port: number, logger: Logger) {
  try {
    await execAsync(`lsof -ti:${port} | xargs kill -9`);
    logger.log(`Process on port ${port} killed successfully.`);
  } catch (error) {
    logger.error(`Error killing process on port ${port}:`, error);
  }
}
