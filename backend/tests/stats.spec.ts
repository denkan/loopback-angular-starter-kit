var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Stats unit tests:', () => {
    it('Should create a Stats instance', (done: Function) => {
        api.post('/stats').send({}).expect(200, done);
    });
});
