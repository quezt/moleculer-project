{{#if_eq logger "Bunyan"}}
import { mkdirpSync, pathExistsSync } from 'fs-extra';
{{/if_eq}}
import { Cursor } from 'mongodb';
import { ServiceBroker } from 'moleculer';
import mongodbMixin from '@mixins/mongodb.mixin';
import { names } from '@actions/names.action';

const SERVICE = 'mock-service';
const ACTION_NAME = 'names';

{{#if_eq logger "Bunyan"}}
const LOG_DIR = './target/log';
if (!pathExistsSync(LOG_DIR)) {
  mkdirpSync(LOG_DIR);
}
{{/if_eq}}
describe(`Test ${ACTION_NAME} action`, () => {
  let broker: ServiceBroker;
  const brokerOptions = {
    logger: {
      options: {
        folder: './target/logs',
        filename: 'names-{date}.log',
      },
      type: 'File',
    },
  };

  beforeAll(async () => {
    broker = new ServiceBroker(brokerOptions);
    broker.createService({
      name: SERVICE,
      version: '1.0.0',
      settings: {
        $noVersionPrefix: true,
      },
      mixins: [mongodbMixin('documents')],
      actions: {
        names,
      },
    });
    await broker.start();
  });

  afterAll(async () => {
    await broker.stop();
  });

  it('should list all document names', async () => {
    const actual: Cursor = await broker.call(`${SERVICE}.names`);
    expect(actual).toBeInstanceOf(Cursor);
    const keys = Object.keys(await actual.next());
    expect(keys.length).toBe(1);
    expect(keys[0]).toBe('name');
  });
});
