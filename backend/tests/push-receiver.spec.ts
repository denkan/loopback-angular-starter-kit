var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('PushReceiver unit tests:', () => {
    it('Should create a PushReceiver instance', (done: Function) => {
        api.post('/push-installs').send({
            appId: 'test',
            deviceType: 'test',
            providerType: 'test',
            pushToken: 'test',
            providerToken: 'test'
        }).expect(200, done);
    });
});
