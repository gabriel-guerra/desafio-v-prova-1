import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig';
import { skip } from 'node:test';

//deixei com skip para não estourar o limite da API Marvel
describe.skip('Testes API Marvel', () => {

    beforeAll(() => {
        return databaseConfig.connectDatabase();
    });

    afterAll(async () => {
        await databaseConfig.drop();
    })

    it('Deve preencher banco de dados se estiver vazio', async () => {

        const response = await request.default(app).get('/fill-database');

        expect(response.status).toEqual(200);
        expect(response.text).toEqual('OK');
    })

    it('Deve retornar erro se banco já estiver preenchido', async () => {

        const response = await request.default(app).get('/fill-database');

        expect(response.status).toEqual(202);
        expect(response.text).toEqual('Banco de dados já preenchido.');
    })

})