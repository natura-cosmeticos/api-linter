import { OpenAPI } from "openapi-types";
import Url from "url-parse";
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultValueForUrl, pushFault } from "./util";

const faults = {
  mustContainVersion: 'Missing version number on url property'
};

const produceMustContainVersion = (urlString: string): RuleFault => {
  return {
    value: produceRuleFaultValueForUrl(urlString),
    errors: [
      {
        severity: Severity.error,
        message: faults.mustContainVersion
      } as RuleFaultContent
    ]
  };
};

const isVersionPresent = (urlString: string): boolean => {
  const url = new Url(urlString);

  const matcher = /\/v\d+/i;
  return matcher.test(url.pathname);
};

export const mustContainVersion = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  /**
   * Without any url, there is no way to evaluate port
   */
  if (!apiParsed.servers) {
    return;
  }

  apiParsed.servers.forEach((server: any) => {
    if (!isVersionPresent(server.url)) {
      pushFault(produceMustContainVersion(server.url), ruleFaults);
    }
  });
};
