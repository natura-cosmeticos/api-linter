import path from 'path';
import { parse } from '../../../index';
import { resourceSpinalCase } from '../../../rules/handlers/resource-spinal-case';
import { RuleFault } from '../../../rules/rule-fault';

describe('resourceSpinalCase function', () => {
  const apiWithoutErrors = path.join(__dirname, '..', '..', 'data', 'openapi-3.0', 'swagger.yml');
  const apiWithSpinalCase = path.join(__dirname, '..', '..', 'data', 'with-spinal-case', 'swagger.yml');
  const apiWithOneFaultAndOneError = path.join(__dirname, '..', '..', 'data', 'without-spinal-case', 'swagger.yml');
  const apiWithOneFaultAndTwoErrors = path.join(__dirname, '..', '..', 'data', 'without-spinal-case-twice-one-path', 'swagger.yml');
  const apiWithTwoFaultsOneErrorEach = path.join(__dirname, '..', '..', 'data', 'without-spinal-case-once-two-path', 'swagger.yml');


  it('should have no faults', async () => {
    const faults: RuleFault[] = [];

    const api = await parse(apiWithoutErrors);

    resourceSpinalCase(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no faults with spinal case', async () => {
    const faults: RuleFault[] = [];

    const api = await parse(apiWithSpinalCase);

    resourceSpinalCase(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have one fault with one error', async () => {
    const faults: RuleFault[] = [];

    const api = await parse(apiWithOneFaultAndOneError);

    resourceSpinalCase(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(1);
  });

  it('should have one fault with two errors', async () => {
    const faults: RuleFault[] = [];

    const api = await parse(apiWithOneFaultAndTwoErrors);

    resourceSpinalCase(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(2);
  });

  it('should have two faults with one error each', async () => {
    const faults: RuleFault[] = [];

    const api = await parse(apiWithTwoFaultsOneErrorEach);

    resourceSpinalCase(api, faults);

    expect(faults.length).toBe(2);
    expect(faults[0].errors.length).toBe(1);
    expect(faults[1].errors.length).toBe(1);
  });
});
