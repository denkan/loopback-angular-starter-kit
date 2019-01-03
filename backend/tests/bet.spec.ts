var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Bet unit tests:', () => {
    it('Should create a Bet instance', (done: Function) => {
        api.post('/bets').send({
            guessResult: 'test'
        }).expect(200, done);
    });
});
