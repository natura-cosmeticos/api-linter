import path from 'path';
import { parse } from '../../../index';
import { noCustomMediaType } from '../../../rules/handlers';
import { RuleFault, Severity } from '../../../rules/rule-fault';

describe('noCustomMediaType function', () => {
  const apiFileWithoutErrors = path.join(__dirname, '..', '..', 'data', 'openapi-3.0', 'swagger.yml');
  const apiFileWithCustomMediaType = path.join(__dirname, '..', '..', 'data', 'with-custom-media-type', 'swagger.yml');
  const apiFileWithVendorMediaType = path.join(__dirname, '..', '..', 'data', 'with-vendor-media-type', 'swagger.yml');

  test('should have no faults', async () => {
    const api = await parse(apiFileWithoutErrors);

    const faults: RuleFault[] = [];

    noCustomMediaType(api, faults);

    expect(faults.length).toBe(0);
  });

  test('should have one fault with error', async () => {
    const api = await parse(apiFileWithCustomMediaType);

    const faults: RuleFault[] = [];

    noCustomMediaType(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(1);
    expect(faults[0].errors[0].severity).toBe(Severity.error);
  });

  test('should have one fault with warning', async () => {
    const api = await parse(apiFileWithVendorMediaType);

    const faults: RuleFault[] = [];

    noCustomMediaType(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(1);
    expect(faults[0].errors[0].severity).toBe(Severity.warning);
  });

});
