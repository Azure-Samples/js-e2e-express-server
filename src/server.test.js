const request = require('supertest');
const { create } = require('./server');

describe('root', () => {
  let app;

  beforeAll(async () => {
    app = await create();
  });

  it('request root, returns html', () => request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Welcome to Express');
      }));

  it('request api, returns json', () => request(app)
      .get('/api/hello')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ hello: 'goodbye' });
      }));

  it('request invalid path, returns 404', () => {
    const invalidPath = '/invalid-path';
    const invalidPathError = `Cannot GET ${invalidPath}`;

    return request(app)
      .get(invalidPath)
      .expect(404)
      .then((res) => {
        expect(res.text).toContain(invalidPathError);
      });
  });
});