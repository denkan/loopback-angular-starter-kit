var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('LeagueSeason unit tests:', () => {
    it('Should create a LeagueSeason instance', (done: Function) => {
        api.post('/league-seasons').send({
            name: 'test',
            startDate: 'Sun Jun 24 2018 21:15:55 GMT+0200 (CEST)',
            endDate: 'Sun Jun 24 2018 21:15:55 GMT+0200 (CEST)'
        }).expect(200, done);
    });
});
