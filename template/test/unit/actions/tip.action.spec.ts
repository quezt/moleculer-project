import { tip } from '@actions/tip.action';

const ACTION_NAME = 'tip';

describe(`Test ${ACTION_NAME} action`, () => {
  it('bill 100 tip 10', async () => {
    if (tip !== undefined && tip.handler !== undefined) {
      const actual = await tip.handler(<any>{ params: { bill: 100 } });
      expect(actual).toBe(10);
    }
  });

  it('bill 600 tip 90', async () => {
    if (tip !== undefined && tip.handler !== undefined) {
      const actual = await tip.handler(<any>{ params: { bill: 600 } });
      expect(actual).toBe(90);
    }
  });
});
