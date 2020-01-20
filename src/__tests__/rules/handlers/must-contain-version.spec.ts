import path from 'path';
import { mustContainVersion } from '../../../rules/handlers';
import { parse } from '../../../index';
import { RuleFault } from '../../../rules/rule-fault';

describe('mustContainVersion function', () => {
  const apiFileWithoutServer =
    path.join(__dirname, '..', '..', 'data', 'without-server-url', 'swagger.yml');
  const apiFileWithVersionUrl =
    path.join(__dirname, '..', '..', 'data', 'with-version-url', 'swagger.yml');
  const apiFileWithoutVersionUrl =
    path.join(__dirname, '..', '..', 'data', 'without-version-url', 'swagger.yml');

  it('should not have any fault due to lack of servers', async () => {
    const api = await parse(apiFileWithoutServer);

    const faults: RuleFault[] = [];
    mustContainVersion(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should not have any fault', async () => {
    const api = await parse(apiFileWithVersionUrl);

    const faults: RuleFault[] = [];
    mustContainVersion(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have one fault', async () => {
    const api = await parse(apiFileWithoutVersionUrl);

    const faults: RuleFault[] = [];
    mustContainVersion(api, faults);

    expect(faults.length).toBe(1);
  });
});
