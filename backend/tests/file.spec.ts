var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('File unit tests:', () => {
    it('Should create a File instance', (done: Function) => {
        api.post('/files').send({
            name: 'test',
            type: 'test',
            size: 12345,
            applicationType: 'test',
            containerModel: 'test',
            container: 'test'
        }).expect(200, done);
    });
});
