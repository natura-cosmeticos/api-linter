import path from 'path';
import { Rules } from '../../rules/rules';

describe('validate function', () => {
  const mockFn = jest.fn();
  jest.mock('../../rules/handle-rules.ts', () => ({ handleRules: mockFn }));

  const apiFile = path.join(__dirname, '..', 'data', 'correct', 'swagger.yml');
  const swaggerFile = path.join(__dirname, '..', 'data', 'swagger-2.0', 'swagger.yml');

  const defaultRules: Required<Rules> = {
    "must-contain-domain-and-context": true,
    "must-contain-port": true,
    "must-contain-version": true,
    "no-singular-resource": true,
    "must-contain-server-url": true,
    "resource-spinal-case": true,
    "no-custom-media-type": true,
    "must-contain-media-type-version": true
  };

  it('should use use the provided rules', async () => {
    const mockedRules: Required<Rules> = {
      "must-contain-domain-and-context": false,
      "must-contain-port": false,
      "must-contain-version": false,
      "no-singular-resource": false,
      "must-contain-server-url": false,
      "resource-spinal-case": false,
      "no-custom-media-type": false,
      "must-contain-media-type-version": false
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
    /**
     * Require goes here due to internal mocking
     */
    const { validate, parse } = require('../../index');

    const api = await parse(apiFile);
    await validate(apiFile);

    expect(mockFn).toHaveBeenCalledWith(api, defaultRules);
  });

  it('should fail when swagger file is 2.0', async () => {
    /**
     * Require goes here due to internal mocking
     */
    const { validate } = require('../../index');

    await expect(validate(swaggerFile, {})).rejects.toThrowError('This is not using OpenAPI 3.0.0^');
  });
});
