# @naturacosmeticos/api-linter

[![Build Status](https://travis-ci.org/natura-cosmeticos/api-linter.svg?branch=master)](https://travis-ci.org/natura-cosmeticos/api-linter)

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
