/**
 * Possible rules to use, they are all `true` by default
 */
export interface Rules {
  /**
   * Allow missing port on api url
   */
  "no-port"?: boolean;
  /**
   * Allow missing domain on api url
   */
  "no-domain"?: boolean;
  /**
   * Allow missing context on api url
   */
  "no-context"?: boolean;
  /**
   * Allow missing version on api url
   */
  "no-version"?: boolean;
  /**
   * Allow missing resource on api url
   */
  "no-resource"?: boolean;
}
