/**
 * Rule Fault data
 */
export interface RuleFault {
  value: string;
  errors: RuleFaultContent[];
}

/**
 * Rule Fault content for each fault
 */
export interface RuleFaultContent {
  severity: Severity;
  message: string;
}

/**
 * Rule Fault severity
 */
export enum Severity {
  error = 'ERROR',
  warning = 'WARNING'
}
