import { defineUpdate, setHandler } from '@temporalio/workflow';
import { actGetCurrentUrl } from '../activities/activies.export';

const getCurrentUrlUpdate = defineUpdate<string, [string, { name: string }]>('getCurrentUrl');

export async function pageManipulationWorkflow({ accountToken }: { accountToken: string }) {
  setHandler(getCurrentUrlUpdate, async (method, params) =>
    actGetCurrentUrl({
      accountToken,
      input: params || {},
    }),
  );

  await new Promise(() => {});
}
