import { Rules } from "./rules";
import { RuleFault } from "./rule-fault";
import { OpenAPI } from "openapi-types";
import {
  mustContainServerURL,
  mustContainPort,
  noSingularResource,
  mustContainVersion,
  mustContainDomainAndContext
} from './handlers';

/**
 * Defines interface that must be implemented for rule handling
 */
export type RuleHandlers = {
  [P in keyof Required<Rules>]: (api: OpenAPI.Document, ruleFaults: RuleFault[]) => void;
};

/**
 * Object containing all the rule handlers
 */
export const Handlers: RuleHandlers = {
  "must-contain-domain-and-context": mustContainDomainAndContext,
  "must-contain-server-url": mustContainServerURL,
  "must-contain-port": mustContainPort,
  "must-contain-version": mustContainVersion,
  "no-singular-resource": noSingularResource
};
