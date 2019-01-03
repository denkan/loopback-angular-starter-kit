var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('PushJobs unit tests:', () => {
    it('Should create a PushJobs instance', (done: Function) => {
        api.post('/push-jobs').send({}).expect(200, done);
    });
});
