var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('AppUser unit tests:', () => {
    it('Should create a AppUser instance', (done: Function) => {
        api.post('/app-users').send({
            name: 'test'
        }).expect(200, done);
    });
});
