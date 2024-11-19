import { ActivityOptions } from '@temporalio/workflow';

export const defaultActivityConfig = {
  startToCloseTimeout: '1 minute',
  retry: { maximumAttempts: 1 },
} as ActivityOptions;
