import { OpenAPI } from "openapi-types";
import slugify from 'slugify';
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultForPath, pushFault } from "./util";

const faults = {
  resourceSpinalCase: 'Resource on path not on spinal-case:'
};

const produceResourceSpinalCaseFault = (path: string, resources: string[]): RuleFault => {
  return {
    value: produceRuleFaultForPath(path),
    errors: resources.map(resource => {
      return {
        severity: Severity.warning,
        message: `${faults.resourceSpinalCase} ${resource}`
      } as RuleFaultContent;
    }),
  };
};

export const resourceSpinalCase = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {

  const apiParsed: any = api;

  const slugifyOptions: any = {
    lower: true,
    remove: /_/
  };

  /**
   * There is no need for null safe checking on paths, since it is an obrigatory
   * field in the OpenAPI Object Specification 3.0
   * https://swagger.io/specification/#oasDocument
   */
  Object.entries(apiParsed.paths).forEach(([path, value]) => {
    /**
     * Gets every value inside the path and removes first empty value, e.g., '/a/b/c' turns intos ['a', 'b', 'c']
     */
    const splitPaths = path.split('/').slice(1);

    const notSpinalCaseResource: string[] = [];

    splitPaths.forEach(splitPath => {
      /* istanbul ignore else  */
      /**
       * Tests for spinal case on the resource
       */
      if (slugify(splitPath, slugifyOptions) !== splitPath) {
        notSpinalCaseResource.push(splitPath);
      }
    });

    /* istanbul ignore else  */
    if (notSpinalCaseResource.length) {
      pushFault(produceResourceSpinalCaseFault(path, notSpinalCaseResource), ruleFaults);
    }
  });
};
