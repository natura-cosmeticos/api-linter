import { OpenAPI } from "openapi-types";
import Url from "url-parse";
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultValueForUrl, pushFault } from './util';

const faults = {
  mustContainDomainAndContext: 'Missing domain and/or context on url property'
};

const produceMustContainDomainAndContext = (urlString: string): RuleFault => {
  return {
    value: produceRuleFaultValueForUrl(urlString),
    errors: [
      {
        severity: Severity.warning,
        message: faults.mustContainDomainAndContext
      } as RuleFaultContent
    ]
  };
};

const isMissingDomainAndContext = (urlString: string): boolean => {
  const url = new Url(urlString);

  /**
   * Matches /domain/context but excludes the version on the test which matches `/v\w+/`
   */
  const matcher = /\/(?!(v\d+)\b)\w+\/(?!(v\d+)\b)\w+/i;
  return !matcher.test(url.pathname);
};

export const mustContainDomainAndContext = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  /**
   * Without any url, there is no way to evaluate port
   */
  if (!apiParsed.servers) {
    return;
  }

  apiParsed.servers.forEach((server: any) => {
    if (isMissingDomainAndContext(server.url)) {
      pushFault(produceMustContainDomainAndContext(server.url), ruleFaults);
    }
  });
};
