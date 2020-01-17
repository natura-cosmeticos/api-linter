import path from 'path';
import { parse } from '../../../index';
import { noSingularResource } from '../../../rules/handlers';
import { RuleFault } from '../../../rules/rule-fault';

describe('noSingularResource function', () => {
  const apiFile = path.join(__dirname, '..', '..', 'data', 'openapi-3.0', 'swagger.yml');
  const apiFileWithTwoIncorrectPaths = path.join(__dirname, '..', '..', 'data', 'with-two-incorrect-paths', 'swagger.yml');
  const apiFileWithNoPathProblems = path.join(__dirname, '..', '..', 'data', 'with-no-incorrect-path', 'swagger.yml');
  const apiFileWithTwoErrorsOnOnePath = path.join(__dirname, '..', '..', 'data', 'with-two-errors-in-one-path', 'swagger.yml');

  it('should receive only one fault due to city path being singular', async () => {
    const apiWithSingularPath = await parse(apiFile);

    const faults: RuleFault[] = [];

    noSingularResource(apiWithSingularPath, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(1);
  });

  it('should receive two faults since there are two paths with singular words paths property', async () => {
    const apiWithTwoPathsWithFaults = await parse(apiFileWithTwoIncorrectPaths);

    const faults: RuleFault[] = [];

    noSingularResource(apiWithTwoPathsWithFaults, faults);

    expect(faults.length).toBe(2);
  });

  it('should receive no faults since there are no paths with problems', async () => {
    const apiWithNoPathProblems = await parse(apiFileWithNoPathProblems);

    const faults: RuleFault[] = [];

    noSingularResource(apiWithNoPathProblems, faults);

    expect(faults.length).toBe(0);
  });

  it('should receibe one fault with two error', async () => {
    const apiWithTwoErrorsOnePath = await parse(apiFileWithTwoErrorsOnOnePath);

    const faults: RuleFault[] = [];

    noSingularResource(apiWithTwoErrorsOnePath, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(2);
  });
});

