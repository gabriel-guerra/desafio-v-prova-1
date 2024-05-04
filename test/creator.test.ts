import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig';
import { creatorsMock } from './mock/creators.mock';
import creatorModel from '../src/model/creator.model';
import { skip } from 'node:test';

describe ('Teste dos criadores', () => {

    beforeAll(() => {
        return databaseConfig.connectDatabase();
    });

    beforeEach(() => {
        return databaseConfig.setup();
    });

    afterEach(() => {
        return databaseConfig.cleanup();
    });

    afterAll(async () => {
        await databaseConfig.drop();
    });

    it('Deve recuperar todos os Creator', async () => {
        const response = await request.default(app).get('/creator');

        expect (response.status).toEqual(200)
        expect (response.body.length).toBe(creatorsMock.length)
    })

    it('Deve obter um Creator pelo ID', async () => {
        const response = await request.default(app).get(`/creator/${creatorsMock[0].id}`)
        const foundCreator = await creatorModel.findOne({id: creatorsMock[0].id})
        
        expect (response.status).toEqual(200)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(foundCreator?.id);
        expect (response.body.fullName).toEqual(foundCreator?.fullName)
        expect (response.body.resourceURI).toEqual(foundCreator?.resourceURI)
        expect(response.body.thumbnail).toEqual(foundCreator?.thumbnail)
        expect(foundCreator!.urls).toMatchObject(response.body.urls)
    })

    it('Deve criar um Creator', async () => {
        const creatorId = 100;

        const creatorToCreate = {
            id: creatorId,
            fullName: 'Stan Lee',
            resourceURI: 'Roteirista',
            urls: [{ type: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const response = await request.default(app).post('/creator/criar').send(creatorToCreate)

        expect (response.status).toEqual(201)
        expect (response.body._id).toBeDefined()
        expect (response.body.id).toEqual(creatorToCreate.id);
        expect (response.body.fullName).toEqual(creatorToCreate.fullName)
        expect (response.body.thumbnail).toEqual(creatorToCreate.thumbnail)
        expect (creatorToCreate.urls).toMatchObject(response.body.urls)

    })

    it('Deve atualizar um Creator', async () => {
        const creatorId = 100;

        const creatorToCreate = {
            id: creatorId,
            fullName: 'Stan Lee',
            resourceURI: 'https://google.com',
            urls: [{ type: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const creatorToUpdate = {
            id: 101,
            fullName: 'Jack Kirby',
            resourceURI: 'https://google.com',
            urls: [{ type: 'tipo', url: 'htts://tipo.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        await creatorModel.create(creatorToCreate)
        const response = await request.default(app).put(`/creator/${creatorId}`).send(creatorToUpdate)

        expect (response.status).toEqual(200)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(creatorId)
        expect (response.body.fullName).toEqual(creatorToUpdate.fullName)
        expect (response.body.resourceURI).toEqual(creatorToUpdate.resourceURI)
        expect (creatorToUpdate.urls).toEqual(response.body.urls)
        expect (response.body.thumbnail).toEqual(creatorToUpdate.thumbnail)

    })

    it('Deve excluir o Creator', async () => {
        const creatorId = 110;

        const creatorToCreate = {
            id: creatorId,
            fullName: 'Stan Lee',
            resourceURI: 'https://google.com',
            urls: [{ type: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        await creatorModel.create(creatorToCreate)
        const response = (await request.default(app).delete(`/creator/${creatorId}`));
        const foundCreator = await creatorModel.findOne({id: creatorId})

        expect (response.status).toEqual(200)
        expect (foundCreator).toBe(null)
    })

    it('Deve retornar 404 no update de um criador inexistente', async () => {
        
        const creatorId = 100;

        const creatorToUpdate = {
            id: 101,
            fullName: 'Jack Kirby',
            resourceURI: 'https://google.com',
            urls: [{ type: 'tipo', url: 'htts://tipo.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const response = await request.default(app).put(`/creator/${creatorId}`).send(creatorToUpdate)

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Criador não encontrado');
 

    })

    it('Deve retornar 404 no delete de um criador inexistente', async () => {
        
        const creatorId = 110;
        const response = (await request.default(app).delete(`/creator/${creatorId}`));

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Criador não encontrado');
 
    })

})