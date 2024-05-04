import * as request from 'supertest';
import app from '../app';

describe('Testes de configuração inicial', () => {
    it('Deve responder helloWorld', async () => {

        const response = await request.default(app).get('/hello');

        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello World');
    });
})