import request from 'supertest';
import { create } from './server.js';

describe('API', () => {

    let app;

    beforeAll(async () => {
        app = await create();
    });

    it('root request', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Welcome to Express');
    });

    it('request api, returns json', async () => {
        const response = await request(app).get('/api/hello');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ hello: 'goodbye' });
    });

    it('request invalid path, returns 404', async () => {
        const invalidPath = '/invalid-path';
        const invalidPathError = `Cannot GET ${invalidPath}`;

        const response = await request(app).get(invalidPath);

        expect(response.statusCode).toBe(404);
        expect(response.text).toContain(invalidPathError);
    });
});