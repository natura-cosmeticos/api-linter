import { OpenAPI } from "openapi-types";
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { pushFault } from "./util";

const faults = {
  noServersFault: `Missing 'servers' property`
};

const produceNoServerFault = (): RuleFault => {
  return {
    value: `The 'servers' property`,
    errors: [
      {
        severity: Severity.error,
        message: faults.noServersFault
      } as RuleFaultContent
    ]
  };
};

export const mustContainServerURL = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  if (!apiParsed.servers) {
    pushFault(produceNoServerFault(), ruleFaults);
    return;
  }
};
