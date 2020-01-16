/**
 * Possible rules to use
 */
export interface Rules {
  /**
   * Checks for missing port number on server url, defaults to `true`
   */
  "must-contain-port"?: boolean;
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
}
