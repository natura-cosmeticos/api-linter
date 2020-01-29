import { OpenAPI } from "openapi-types";
import mime from 'mime-types';
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultForPathMethod, pushFault } from "./util";

const faults = {
  nonStandardMediaType: `This content media-type doesn't follow RFC 6838 standard media-types`,
  vndMediaType: `This content media-type uses custom vendor definitions in RFC 6838 and it should be replaced as a standard one`
};

const produceNonStandardMediaType = (path: string, method: string, httpStatus: string): RuleFault => {
  return {
    value: produceRuleFaultForPathMethod(path, method, httpStatus),
    errors: [
      {
        severity: Severity.error,
        message: faults.nonStandardMediaType
      } as RuleFaultContent
    ]
  };
};

const produceVendorMediaType = (path: string, method: string, httpStatus: string): RuleFault => {
  return {
    value: produceRuleFaultForPathMethod(path, method, httpStatus),
    errors: [
      {
        severity: Severity.warning,
        message: faults.vndMediaType
      } as RuleFaultContent
    ]
  };
};

const isStandardMediaType = (mediaType: string) => {
  return !!mime.extension(mediaType);
};

const containsVendorInMediaType = (mediaType: string) => {
  const vendorPattern = /^\w+\/vnd(\.\w+)+$/;
  return vendorPattern.test(mediaType);
};

export const noCustomMediaType = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  Object.entries(apiParsed.paths).forEach(([path, pathValue]) => {
    Object.entries(pathValue as any).forEach(([method, methodValue]) => {
      const responses = Object.keys((methodValue as any).responses);

      responses.forEach(response => {
        const mediaTypes = Object.keys((methodValue as any).responses[response].content);

        mediaTypes.forEach(mediaType => {
          const mainMediaType = mediaType.split(';')[0];

          if(containsVendorInMediaType(mainMediaType)) {
            pushFault(produceVendorMediaType(path, method, response), ruleFaults);
          } else if(!isStandardMediaType(mainMediaType)) {
            pushFault(produceNonStandardMediaType(path, method, response), ruleFaults);
          }
        });
      });
    });
  });
};
