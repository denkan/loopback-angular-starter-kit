var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Push unit tests:', () => {
    it('Should create a Push instance', (done: Function) => {
        api.post('/push').send({}).expect(200, done);
    });
});
