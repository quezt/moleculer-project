import { Context, Service, ServiceSchema } from 'moleculer';{{#tipAction}}
import { tip } from '../actions/tip.action';{{/tipAction}}

const serviceSchema: ServiceSchema = {
  name: 'calculator',
  version: '1.0.0',
  settings: {
    $noVersionPrefix: false,
  },
  actions: {
    add: {
      params: {
        a: { type: 'number' },
        b: { type: 'number' },
      },
      async handler(
        this: Service,
        context: Context<{ a: number; b: number }>
      ): Promise<number> {
        return Number(context.params.a) + Number(context.params.b);
      },
    },
    sub(context: Context<any>): number {
      return context.params.a - context.params.b;
    },{{#tipAction}}
    tip,{{/tipAction}}
  },
};

export = serviceSchema;
