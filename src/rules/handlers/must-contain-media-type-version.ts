import { OpenAPI } from "openapi-types";
import { RuleFault, Severity, RuleFaultContent } from "../rule-fault";
import { produceRuleFaultForPathMethod, pushFault } from './util';

const faults = {
  mustContainMediaTypeVersion: `Must contain version when media-type is vendor specific`
};

const produceMustContainMediaTypeVersion = (path: string, method: string, httpStatus: string): RuleFault => {
  return {
    value: produceRuleFaultForPathMethod(path, method, httpStatus),
    errors: [
      {
        severity: Severity.warning,
        message: faults.mustContainMediaTypeVersion
      } as RuleFaultContent
    ]
  };
};

const containsVersion = (mediaTypeParameters: string[]) => {
  const versionPattern = /version=\d+/;

  for(const index in mediaTypeParameters) {
    if(versionPattern.test(mediaTypeParameters[index])) {
      return true;
    }
  }
  return false;
};

const isMediaTypeVendorSpecific = (mediaType: string) => {
  const vendorSpecificPattern = /\/vnd./;
  return vendorSpecificPattern.test(mediaType);
};

export const mustContainMediaTypeVersion = (api: OpenAPI.Document, ruleFaults: RuleFault[]) => {
  const apiParsed: any = api;

  Object.entries(apiParsed.paths).forEach(([path, pathValue]) => {
    Object.entries(pathValue as any).forEach(([method, methodValue]) => {
      const responses = Object.keys((methodValue as any).responses);

      responses.forEach(response => {
        const mediaTypes = Object.keys((methodValue as any).responses[response].content);

        mediaTypes.forEach(mediaType => {
          const mediaTypeObject = mediaType.split(';');

          if(isMediaTypeVendorSpecific(mediaTypeObject[0])) {
            /**
             * The first element of the array is the media-type itself
             * so it doesn't need to be checked
             */
            mediaTypeObject.shift();

            if(!containsVersion(mediaTypeObject)) {
              pushFault(produceMustContainMediaTypeVersion(path, method, response), ruleFaults);
            }
          }
        });
      });
    });
  });
};
