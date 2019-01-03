var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('PushNotification unit tests:', () => {
    it('Should create a PushNotification instance', (done: Function) => {
        api.post('/push-notifications').send({
            sentAt: 'Sun Oct 07 2018 09:25:40 GMT+0200 (CEST)'
        }).expect(200, done);
    });
});
