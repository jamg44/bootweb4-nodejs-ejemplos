const request = require('supertest');

const app = require('../app');

describe('Login', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/login')
      .expect(200, done); // verificar que devuelve un http status code 200
                          // y luego llamar a done()
  });
});
