var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('SourceXMLSoccer unit tests:', () => {
    it('Should create a SourceXMLSoccer instance', (done: Function) => {
        api.post('/source-xml-soccers').send({}).expect(200, done);
    });
});
