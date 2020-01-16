import path from 'path';
import { Rules } from '../../rules/rules';

describe('validate function', () => {
  const mockFn = jest.fn();
  jest.mock('../../rules/handle-rules.ts', () => ({ handleRules: mockFn }));

  const apiFile = path.join(__dirname, '..', 'data', 'correct', 'swagger.yml');

  it('should use use the provided rules', async () => {
    const mockedRules: Rules = {
      "must-contain-domain-and-context": false,
      "must-contain-port": false,
      "must-contain-version": false,
      "no-singular-resource": false
    };

    /**
     * Require goes here due to internal mocking
     */
    const { validate, parse } = require('../../index');

    const api = await parse(apiFile);
    await validate(apiFile, mockedRules);

    expect(mockFn).toHaveBeenCalledWith(api, mockedRules);
  });

  it('should use the default rules', async () => {
    const defaultRules: Rules = {
      "must-contain-domain-and-context": true,
      "must-contain-port": true,
      "must-contain-version": true,
      "no-singular-resource": true
    };

    /**
     * Require goes here due to internal mocking
     */
    const { validate, parse } = require('../../index');

    const api = await parse(apiFile);
    await validate(apiFile, {});

    expect(mockFn).toHaveBeenCalledWith(api, defaultRules);
  });
});
