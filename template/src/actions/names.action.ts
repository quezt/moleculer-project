import { ActionSchema, Service } from 'moleculer';
import { Cursor } from 'mongodb';

const names: ActionSchema = {
  async handler(this: Service): Promise<Cursor> {
    const cursor: Cursor = await this.adapter.collection.find(
      {},
      { projection: { _id: 0, name: 1 } }
    );
    return cursor;
  },
};

export { names };
