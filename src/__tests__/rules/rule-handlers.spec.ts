import path from 'path';
import { Handlers } from '../../rules/rule-handlers';
import { parse } from '../../index';

/**
 * This test will be removed later when the handlers are actually implemented
 * it was added to reach 100% coverage for now
 * @todo remove this test after handler tests are all implemented
 */
describe('Handlers object', () => {
  const apiFile = path.join(__dirname, '..', 'data', 'correct', 'swagger.yml');

  it('should import all handlers correctly', async () => {
    const api = await parse(apiFile);

    Object.values(Handlers).forEach(handler => {
      handler(api, []);
    });
  });
});
