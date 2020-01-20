import { RuleFault } from "../rule-fault";

/**
 * Outputs a uniform string for server url errors
 * @param url The url to use on the output
 */
export const produceRuleFaultValueForUrl = (url: string) => `Server url: ${url}`;

/**
 * Outputs a uniform string for path errors
 * @param path The path to use on the output
 */
export const produceRuleFaultForPath = (path: string) => `Path: ${path}`;

/**
 * Pushes the `fault` into the `ruleFaults` array without overlapping values
 * @param fault The RuleFault to push
 * @param ruleFaults The RuleFault array to push into
 */
export const pushFault = (fault: RuleFault, ruleFaults: RuleFault[]) => {
  const filteredFaults = ruleFaults.filter(ruleFault => ruleFault.value === fault.value);

  if (filteredFaults.length) {
    filteredFaults[0].errors.push(...fault.errors);
  } else {
    ruleFaults.push(fault);
  }
};
