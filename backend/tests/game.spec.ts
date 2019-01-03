var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Game unit tests:', () => {
    it('Should create a Game instance', (done: Function) => {
        api.post('/games').send({
            title: 'test'
        }).expect(200, done);
    });
});
