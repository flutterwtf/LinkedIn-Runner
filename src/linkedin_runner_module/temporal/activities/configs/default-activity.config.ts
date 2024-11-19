import { ActivityOptions } from '@temporalio/workflow';

export const defaultActivityConfig = {
  startToCloseTimeout: '1 minute',
  retry: 1,
} as ActivityOptions;
