import CalculatorService from '@services/calculator.service';
import { ServiceBroker } from 'moleculer';

const SERVICE_NAME = '1.0.0.calculator';
const SERVICE = `${SERVICE_NAME}`;

describe(`Test '${SERVICE}' service`, () => {
  describe('Test actions', () => {
    const broker = new ServiceBroker({ logger: false });
    broker.createService(CalculatorService);

    beforeAll(() => broker.start());
    afterAll(() => broker.stop());

    describe(`Test '${SERVICE}.add' action`, () => {
      it('adds 7 + 3 to equal 10', async () => {
        const actual: number = await broker.call(`${SERVICE}.add`, {
          a: 7,
          b: 3,
        });
        expect(actual).toBe(10);
      });
    });

    describe(`Test '${SERVICE}.sub' action`, () => {
      it('subtracts 220 - 40 to equal 180', async () => {
        const actual: number = await broker.call(`${SERVICE}.sub`, {
          a: 220,
          b: 40,
        });
        expect(actual).toBe(180);
      });
    });
  });
});
