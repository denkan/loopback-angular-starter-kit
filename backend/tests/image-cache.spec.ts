var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('ImageCache unit tests:', () => {
    it('Should create a ImageCache instance', (done: Function) => {
        api.post('/image-caches').send({}).expect(200, done);
    });
});
