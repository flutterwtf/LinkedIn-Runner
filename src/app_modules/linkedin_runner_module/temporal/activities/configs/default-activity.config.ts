import { ActivityOptions } from '@temporalio/workflow';

export const defaultActivityConfig = {
  startToCloseTimeout: '1 minute',
} as ActivityOptions;
