var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('League unit tests:', () => {
    it('Should create a League instance', (done: Function) => {
        api.post('/leagues').send({
            name: 'test',
            country: 'test'
        }).expect(200, done);
    });
});
