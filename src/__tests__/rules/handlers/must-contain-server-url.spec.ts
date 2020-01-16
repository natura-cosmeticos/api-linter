import path from 'path';
import { parse } from '../../../index';
import { mustContainServerURL } from '../../../rules/handlers';
import { RuleFault } from '../../../rules/rule-fault';

describe('mustContainServerURL function', () => {
  const apiFile = path.join(__dirname, '..', '..', 'data', 'openapi-3.0', 'swagger.yml');
  const apiFileWithoutServer = path.join(__dirname, '..', '..', 'data', 'without-server-url', 'swagger.yml');

  const noServerError = {
    "value": "The 'servers' property",
    "errors": [
      {
        "severity": "ERROR",
        "message": "Missing 'servers' property"
      }
    ]
  };

  it('should have no faults on array', async () => {
    const api = await parse(apiFile);

    const faults: RuleFault[] = [];

    mustContainServerURL(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have one fault on array', async () => {
    const api = await parse(apiFileWithoutServer);

    const faults: RuleFault[] = [];

    mustContainServerURL(api, faults);

    expect(faults.length).toBe(1);
    expect(faults[0]).toMatchObject(noServerError);
  });

});
