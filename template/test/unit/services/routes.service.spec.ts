import { ServiceBroker } from 'moleculer';
import { readFileSync } from 'fs-extra';
import { sync } from 'find-up';

// @ts-ignore
const pkg = JSON.parse(readFileSync(sync('package.json')));

const SERVICE_NAME = `${pkg.version}.routes`;
const SERVICE = `${SERVICE_NAME}`;

describe(`Test '${SERVICE}' service`, () => {
  describe('Test create server', () => {
    let broker: ServiceBroker;
    beforeEach(() => {
      jest.resetModules();
    });

    afterEach(async () => {
      await broker.stop();
    });

    it('`created` with only HTTP', async () => {
      delete process.env.CERT_FILE;
      delete process.env.PRIVKEY_FILE;
      {{#useLint}}
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      {{/useLint}}
      const routesService = require('@services/routes.service');
      broker = new ServiceBroker({
        logger: {
          options: {
            filename: 'create-http-{date}.log',
            folder: './target/logs',
          },
          type: 'File',
        },
      });
      const service = broker.createService(routesService);
      await broker.start();
      expect(broker.started).toBeTruthy();
      expect(service.isHTTPS).toBeFalsy();
    });

    it('`created` with HTTPS', async () => {
      process.env.CERT_FILE = 'test/fixtures/localhost.crt';
      process.env.PRIVKEY_FILE = 'test/fixtures/localhost.key';
      {{#useLint}}
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      {{/useLint}}
      const routesService = require('@services/routes.service');
      broker = new ServiceBroker({
        logger: {
          options: {
            filename: 'create-https-{date}.log',
            folder: './target/logs',
          },
          type: 'File',
        },
      });
      const service = broker.createService(routesService);
      await broker.start();
      expect(broker.started).toBeTruthy();
      expect(service.isHTTPS).toBeTruthy();
    });
  });
});
