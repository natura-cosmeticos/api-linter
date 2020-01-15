import SwaggerParser from 'swagger-parser';

/**
 * Parses, dereferences, and validates the given Swagger API.
 * @param api — An OpenAPI definition, or the file path or URL of an OpenAPI definition.
 */
export const parse = async (api: string) => {
  return await SwaggerParser.validate(api);
};
