import { Context, Service, ServiceSchema } from 'moleculer';
// import { Cursor } from 'mongodb';

const DOCUMENTS_STORE = '1.0.0.documents-store';
const serviceSchema: ServiceSchema = {
  name: 'documents',
  version: '1.0.0',
  settings: {
    $noVersionPrefix: false,
  },
  actions: {
    create: {
      async handler(this: Service, context: Context): Promise<any> {
        try {
          const response = context.call(
            `${DOCUMENTS_STORE}.create`,
            context.params
          );
          return response;
        } catch (error) {
          this.logger.error(error);
        }
      },
    },
    delete: {
      params: {
        id: { type: 'string' },
      },
      async handler(this: Service, context: Context): Promise<any> {
        try {
          await context.call(`${DOCUMENTS_STORE}.remove`, context.params);
          // @ts-ignore
          context.meta.$statusCode = 204;
        } catch (error) {
          this.logger.error(error);
        }
      },
    },
    find: {
      async handler(context: Context<any>): Promise<any> {
        return context.call(`${DOCUMENTS_STORE}.find`, context.params);
      },
    },
    getById: {
      params: {
        id: { type: 'string' },
      },
      async handler(context: Context): Promise<any> {
        return context.call(`${DOCUMENTS_STORE}.get`, context.params);
      },
    },
    update: {
      params: {
        id: { type: 'string' },
      },
      async handler(this: Service, context: Context): Promise<any> {
        try {
          const response = await context.call(
            `${DOCUMENTS_STORE}.update`,
            context.params
          );
          return response;
        } catch (error) {
          this.logger.error(error);
        }
      },
    },
  },
};

export = serviceSchema;
