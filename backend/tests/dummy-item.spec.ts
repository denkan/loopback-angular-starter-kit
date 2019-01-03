var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('DummyItem unit tests:', () => {
    it('Should create a DummyItem instance', (done: Function) => {
        api.post('/dummy-items').send({
            title: 'test',
            description: 'test'
        }).expect(200, done);
    });
});
