var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('GameUser unit tests:', () => {
    it('Should create a GameUser instance', (done: Function) => {
        api.post('/game-users').send({}).expect(200, done);
    });
});
