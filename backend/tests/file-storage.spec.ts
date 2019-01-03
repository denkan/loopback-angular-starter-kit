var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('FileStorage unit tests:', () => {
    it('Should create a FileStorage instance', (done: Function) => {
        api.post('/file-storages').send({}).expect(200, done);
    });
});
