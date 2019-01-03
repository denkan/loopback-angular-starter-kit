var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Team unit tests:', () => {
    it('Should create a Team instance', (done: Function) => {
        api.post('/teams').send({
            name: 'test',
            country: 'test',
            stadium: 'test',
            websiteUrl: 'test',
            wikiUrl: 'test',
            stadiumCapacity: 12345,
            managerName: 'test'
        }).expect(200, done);
    });
});
