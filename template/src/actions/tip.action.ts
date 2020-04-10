import { ActionSchema, Context } from 'moleculer';

const tip: ActionSchema = {
  params: {
    bill: { type: 'number' },
  },
  async handler(context: Context<{ bill: number }>) {
    let tip = 0.1;
    if (context.params.bill > 500) tip = 0.15;
    return context.params.bill * tip;
  },
};

export { tip };
