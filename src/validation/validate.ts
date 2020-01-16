import { parse } from '../swagger/swagger-parser';
import { Rules } from '../rules/rules';
import { handleRules } from '../rules/handle-rules';

const defaultRules: Rules = {
  "must-contain-domain-and-context": true,
  "must-contain-port": true,
  "must-contain-version": true,
  "no-singular-resource": true
};

/**
 * Parses and validates the api based on the informed rules
 * @param api An OpenAPI definition, or the file path or URL of an OpenAPI definition.
 * @returns A Promise of an array of RuleFault
 */
export const validate = async (api: string, rules: Rules) => {
  const swagger = await parse(api);

  const parsedRules: Rules = {
    ...defaultRules,
    ...rules
  };

  return handleRules(swagger, parsedRules);
};
