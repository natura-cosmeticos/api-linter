# @naturacosmeticos/api-linter

[![Build Status](https://travis-ci.org/natura-cosmeticos/api-linter.svg?branch=master)](https://travis-ci.org/natura-cosmeticos/api-linter) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![NPM](https://img.shields.io/npm/l/@naturacosmeticos/api-linter) [![Known Vulnerabilities](https://snyk.io/test/github/natura-cosmeticos/api-linter/badge.svg)](https://snyk.io/test/github/natura-cosmeticos/api-linter)

A comprehensive API linter for swagger files using OpenAPI 3.0 following Natura Cosmeticos best practices

## Installation

```sh
# with npm
npm install --save @naturacosmeticos/api-linter

# with yarn
yarn add @naturacosmeticos/api-linter
```

## Usage

```javascript
const path = require('path');
const { validate } = require('@naturacosmeticos/api-linter');

const swaggerFile = path.join('path', 'to', 'swagger', 'file.yml');

const promise = validate(swaggerFile);

promise.then(faults => {
  console.log(faults);
}).catch(err => {
  console.error(err);
});
```

## CLI
```sh
$ npm install -g @naturacosmeticos/api-linter

$ api-linter --help ## For options

$ api-linter --file=/path/to/swagger.yml ## Basic usage
```
