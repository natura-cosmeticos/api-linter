import path from 'path';
import { parse } from '../../../index';
import { mustContainPort } from '../../../rules/handlers';
import { RuleFault } from '../../../rules/rule-fault';

describe('mustContainPort function', () => {
  const apiFileWithoutPort = path.join(__dirname, '..', '..', 'data', 'without-port-on-url', 'swagger.yml');
  const apiFileMultipleUrlWithoutPort = path.join(__dirname, '..', '..', 'data', 'without-port-on-url', 'swagger-with-3-url.yml');
  const apiFileMultipleUrlOneWithPort = path.join(__dirname, '..', '..', 'data', 'without-port-on-url', 'swagger-with-3-url-1-with-port.yml');
  const apiFileWithPort = path.join(__dirname, '..', '..', 'data', 'with-port-on-url', 'swagger.yml');
  const apiFileWithoutServer = path.join(__dirname, '..', '..', 'data', 'without-server-url', 'swagger.yml');

  it('should return when no server is present', async () => {
    const api = await parse(apiFileWithoutServer);

    const faults: RuleFault[] = [];

    mustContainPort(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no faults when the port is present on url', async () => {
    const api = await parse(apiFileWithPort);

    const faults: RuleFault[] = [];

    mustContainPort(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have fault when there is no port on server url', async () => {
    const api = await parse(apiFileWithoutPort);

    const faults: RuleFault[] = [];

    mustContainPort(api, faults);

    expect(faults.length).toBe(1);
  });

  it('should have multiple faults when there is no port on the three server url', async () => {
    const api = await parse(apiFileMultipleUrlWithoutPort);

    const faults: RuleFault[] = [];

    mustContainPort(api, faults);

    expect(faults.length).toBe(3);
  });

  it('should have multiple faults when there is one url with port and two without port', async () => {
    const api = await parse(apiFileMultipleUrlOneWithPort);

    const faults: RuleFault[] = [];

    mustContainPort(api, faults);

    expect(faults.length).toBe(2);
  });

});
