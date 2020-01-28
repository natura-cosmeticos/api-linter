/**
 * Possible rules to use
 */
export interface Rules {
  /**
   * Checks for missing port number on server url, defaults to `true`
   */
  "must-contain-port"?: boolean;
  /**
   * Checks for server url properties, defaults to true
   */
  "must-contain-server-url"?: boolean;
  /**
   * Allow resource names in singular, defaults to `true`
   */
  "no-singular-resource"?: boolean;
  /**
   * Checks for missing version number on server url, defaults to `true`
   */
  "must-contain-version"?: boolean;
  /**
   * Checks for missing `/domain/context` on server url, defaults to `true`
   */
  "must-contain-domain-and-context"?: boolean;
  /**
   * Checks for resources not using spinal case, defaults to `true`
   */
  "resource-spinal-case"?: boolean;
  /**
   * Checks for main media types defined in RFC 6838, defaults to `true`
   */
  "no-custom-media-type"?: boolean;
}
