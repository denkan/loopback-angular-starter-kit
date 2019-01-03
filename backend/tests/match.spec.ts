var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Match unit tests:', () => {
    it('Should create a Match instance', (done: Function) => {
        api.post('/matches').send({
            startDate: 'Sun Jun 24 2018 22:00:49 GMT+0200 (CEST)',
            round: 12345,
            gameTime: 12345,
            goalsHome: 12345,
            goalsAway: 12345,
            location: 'test',
            stadium: 'test'
        }).expect(200, done);
    });
});
