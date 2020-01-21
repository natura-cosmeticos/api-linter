import path from 'path';
import { parse } from '../../../index';
import { mustContainDomainAndContext } from '../../../rules/handlers';
import { RuleFault } from '../../../rules/rule-fault';

describe('mustContainDomainAndContext function', () => {
  const apiFileWithoutServer = path.join(__dirname, '..', '..', 'data', 'without-server-url', 'swagger.yml');
  const apiFileWithDomainAndcontext = path.join(__dirname, '..', '..', 'data', 'with-domain-and-context', 'swagger.yml');
  const apiFileWithDomaincontextAndVersion = path.join(__dirname, '..', '..', 'data', 'with-domain-context-and-version', 'swagger.yml');
  const apiFileWithoutDomainAndContext = path.join(__dirname, '..', '..', 'data', 'without-domain-and-context', 'swagger.yml');
  const apiFileWithoutDomainAndWithContext = path.join(__dirname, '..', '..', 'data', 'without-domain-and-with-context', 'swagger.yml');

  it('should return when no server is present', async () => {
    const api = await parse(apiFileWithoutServer);

    const faults: RuleFault[] = [];

    mustContainDomainAndContext(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no faults when domain and context are present', async () => {
    const api = await parse(apiFileWithDomainAndcontext);

    const faults: RuleFault[] = [];

    mustContainDomainAndContext(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have no faults when domain, context and version are present', async () => {
    const api = await parse(apiFileWithDomaincontextAndVersion);

    const faults: RuleFault[] = [];

    mustContainDomainAndContext(api, faults);

    expect(faults.length).toBe(0);
  });

  it('should have one fault when domain and context are not present', async () => {
    const api = await parse(apiFileWithoutDomainAndContext);

    const faults: RuleFault[] = [];

    mustContainDomainAndContext(api, faults);

    expect(faults.length).toBe(1);
  });

  it('should have one fault when domain is not present and context is', async () => {
    const api = await parse(apiFileWithoutDomainAndWithContext);

    const faults: RuleFault[] = [];

    mustContainDomainAndContext(api, faults);

    expect(faults.length).toBe(1);
  });
});
