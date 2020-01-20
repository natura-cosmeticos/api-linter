import { OpenAPI } from "openapi-types";
import Url from "url-parse";
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultValueForUrl, pushFault } from './util';

const faults = {
  mustContainPort: 'Missing port on url property'
};

const produceMustContainPort = (urlString: string): RuleFault => {
  return {
    value: produceRuleFaultValueForUrl(urlString),
    errors: [
      {
        severity: Severity.warning,
        message: faults.mustContainPort
      } as RuleFaultContent
    ]
  };
};

const isPortMissing = (urlString: string): boolean => {
  const url = new Url(urlString);
  return !url.port;
};

export const mustContainPort = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  /**
   * Without any url, there is no way to evaluate port
   */
  if (!apiParsed.servers) {
    return;
  }

  apiParsed.servers.forEach((server: any) => {
    if (isPortMissing(server.url)) {
      pushFault(produceMustContainPort(server.url), ruleFaults);
    }
  });

};
