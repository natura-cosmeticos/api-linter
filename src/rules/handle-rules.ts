import { OpenAPI } from "openapi-types";
import { RuleFault } from "./rule-fault";
import { Rules } from "./rules";
import { RuleHandlers, Handlers } from './rule-handlers';

/**
 * Handles all the rules supplied as param and returns all the faults found on the api file
 * @param api an OpenAPI.Document object
 * @param rules the rules to be used
 */
export const handleRules = (api: OpenAPI.Document, rules: Rules): RuleFault[] => {
  const faults: RuleFault[] = [];

  Object.entries(rules).forEach(([key, value]) => {
    const handler = Handlers[key as keyof RuleHandlers];
    /* istanbul ignore else  */
    if (value && handler !== undefined) {
      handler(api, faults);
    }
  });

  return faults;
};
