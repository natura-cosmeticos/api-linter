import path from 'path';

describe('handleRules function', () => {
  const mockedRuleHandlers = {
    "must-contain-domain-and-context": jest.fn(),
    "must-contain-port": jest.fn(),
    "must-contain-version": jest.fn(),
    "no-singular-resource": jest.fn()
  };
  jest.mock('../../rules/rule-handlers.ts', () => ({ Handlers: mockedRuleHandlers }));

  const trueRules = {
    "must-contain-domain-and-context": true,
    "must-contain-port": true,
    "must-contain-version": true,
    "no-singular-resource": true
  };

  const apiFile = path.join(__dirname, '..', 'data', 'correct', 'swagger.yml');

  it('it should call all the rule handlers', async () => {
    /**
     * Require goes here due to internal mocking
     */
    const { validate } = require('../../index');

    await validate(apiFile, trueRules);

    Object.values(mockedRuleHandlers).forEach(fn => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

  });
});
