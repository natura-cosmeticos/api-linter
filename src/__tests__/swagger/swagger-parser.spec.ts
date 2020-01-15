import { parse } from '../../index';
import path from 'path';

describe('parse function', () => {
  it('it should parse the swagger file without error', (done) => {
    parse(path.join(__dirname, '..', 'data', 'correct', 'swagger.yml'))
      .then(value => {
        done();
      }).catch(err => {
        done.fail(err);
      });
  });
  it('it should not parse the swagger file with syntax error', (done) => {
    parse(path.join(__dirname, '..', 'data', 'with-syntax-error', 'swagger.yml'))
      .then(value => {
        done.fail('It should have failed to parse the yml file');
      }).catch(err => {
        done();
      });
  });
});
