const request = require('supertest');
const { create } = require('./server.js');



describe('root', () => {

    it('request root, returns html', async (done) => {

        const app = await create();

        return request(app)
            .get('/')
            .expect(200)
            .then((res) => {
                expect(res.text).toContain('Welcome to Express');
                done();
            }).catch(err => done(err));;
    });
});
