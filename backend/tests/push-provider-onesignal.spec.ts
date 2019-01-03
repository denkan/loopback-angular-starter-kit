var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('PushProviderOnesignal unit tests:', () => {
    it('Should create a PushProviderOnesignal instance', (done: Function) => {
        api.post('/push-provider-onesignals').send({}).expect(200, done);
    });
});
