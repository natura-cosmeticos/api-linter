const path = require('path');
const { validate } = require('@naturacosmeticos/api-linter');

describe('Example test suite', () => {
  it('should have faults on the swagger file', async () => {
    const swaggerFile = path.join(__dirname, '..', 'swagger', 'swagger.yml');

    const faults = await validate(swaggerFile);

    expect(faults.length).toBe(2);
    expect(faults[0].errors.length).toBe(3);
    expect(faults[1].errors.length).toBe(1);

    console.log(JSON.stringify(faults, null, 2));
  });
});
