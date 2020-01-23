#!/usr/bin/env node

/* tslint:disable:no-console */

import yargs from 'yargs';
import fs from 'fs';
import { DefaultRules, validate } from './validation/validate';

const ruleOptions = () => {
  const out: any = {};

  Object.entries(DefaultRules).forEach(([key, value]) => {
    out[key] = {
      type: 'boolean',
      demandOption: false,
      default: value
    } as yargs.Options;
  });

  return out;
};

const cli = () => {
  const options: any = {
    ...ruleOptions(),
    outFile: {
      type: 'string',
      demandOption: false,
      description: 'The file to output the result'
    } as yargs.Options,
    file: {
      type: 'string',
      demandOption: true,
      description: 'The swagger file to validate'
    } as yargs.Options
  };

  try {
    const argv = yargs
      .usage('Usage: $0 --file=[path]')
      .options(options)
      .version(require('../package.json').version)
      .help()
      .argv;

    const parseArgs = () => {
      const out: any = {};

      Object.entries(DefaultRules).forEach(([key, value]) => {
        out[key] = argv[key] === undefined ? value : argv[key];
      });

      return out;
    };

    const promise = validate(argv.file as string, parseArgs());

    promise.then(faults => {
      if (argv.outFile !== undefined) {
        fs.writeFileSync(argv.outFile as string, JSON.stringify(faults, null, 2));
      } else {
        console.log(JSON.stringify(faults, null, 2));
      }
    }).catch(err => {
      console.error(err);
    });
  } catch (err) {
    return;
  }
};

cli();
