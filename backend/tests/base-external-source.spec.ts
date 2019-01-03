var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('BaseExternalSource unit tests:', () => {
    it('Should create a BaseExternalSource instance', (done: Function) => {
        api.post('/base-external-sources').send({}).expect(200, done);
    });
});
