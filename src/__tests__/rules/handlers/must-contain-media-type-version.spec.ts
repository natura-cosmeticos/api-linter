import path from 'path';
import { parse } from '../../../index';
import { mustContainMediaTypeVersion } from '../../../rules/handlers';
import { RuleFault, Severity } from '../../../rules/rule-fault';

describe('mustContainMediaTypeVersion function', () => {
  const apiFileWithoutFaults = path.join(__dirname, '..', '..', 'data', 'openapi-3.0', 'swagger.yml');
  const apiFileWithoutFaultsAndVendorMediaType = path.join(__dirname, '..', '..', 'data', 'with-vendor-and-version', 'swagger.yml');
  const apiFileWithOneWarning = path.join(__dirname, '..', '..', 'data', 'with-vendor-and-without-version', 'swagger.yml');
  const apiFileWithoutFaultsAndVendorMediaTypeAndCharset = path.join(__dirname, '..', '..', 'data', 'with-vendor-with-charset-with-version', 'swagger.yml');

  it('should have no faults', async () => {
    const api = await parse(apiFileWithoutFaults);

    const faults: RuleFault[] = [];

    mustContainMediaTypeVersion(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no fault with vendor and version', async () => {
    const api = await parse(apiFileWithoutFaultsAndVendorMediaType);

    const faults: RuleFault[] = [];

    mustContainMediaTypeVersion(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no fault with vendor, version and charset', async () => {
    const api = await parse(apiFileWithoutFaultsAndVendorMediaTypeAndCharset);

    const faults: RuleFault[] = [];

    mustContainMediaTypeVersion(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have one fault with vendor and without version', async () => {
    const api = await parse(apiFileWithOneWarning);

    const faults: RuleFault[] = [];

    mustContainMediaTypeVersion(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0].errors.length).toBe(1);
    expect(faults[0].errors[0].severity).toBe(Severity.warning);
  });
});
