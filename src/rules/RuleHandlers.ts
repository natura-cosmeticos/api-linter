import { Rules } from "./Rules";
import { RuleFault } from "./Rulefault";

/**
 * Defines interface that must be implemented for rule handling
 */
export type RuleHandlers = {
  [P in keyof Rules]: (value: string, ruleFaults: [RuleFault]) => void;
};
