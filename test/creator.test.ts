import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig';
import { creatorsMock } from './mock/creators.mock';
import creatorModel from 'src/model/creator.model';
import { comicsMock } from './mock/comics.mock';
import comicsModel from 'src/model/comics.model';

describe ('Teste dos usuários', async () => {

    beforeAll(() => {
        return databaseConfig.connectDatabase();
    });

    beforeEach(() => {
        return databaseConfig.setup();
    });

    afterEach(() => {
        return databaseConfig.cleanup();
    });

    afterAll(() => {
        return databaseConfig.drop();
    })

    it('Deve recuperar todos os Creator', async () => {
        const response = await request.default(app).get('/creator');

        expect (response.status).toEqual(200)
        expect (response.body.length).toBe(creatorsMock.length)
    })

    it('Deve obter um Creator pelo ID', async () => {
        const response = await request.default(app).get(`/creator/${creatorsMock[0].id}`)
        const FoundCreator = await creatorModel.findOne({id:comicsMock[0].id})

        expect (response.status).toEqual(200)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(FoundCreator?.id);
        expect (response.body.fullName).toEqual(FoundCreator?.fullName)
        expect (response.body.resourceURI).toEqual(FoundCreator?.resourceURI)
        expect(response.body.urls).toEqual(FoundCreator?.urls)
        expect(response.body.thumbnail).toEqual(FoundCreator?.thumbnail)
    })

    it('Deve criar um Creator', async () => {
        const CreatorId = 100;

        const CreatorToCreate = {
            id: CreatorId,
            fullName: 'Stan Lee',
            resourceURI: 'Roteirista',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const response = await request.default(app).post('/creator/criar').send(CreatorToCreate)

        expect (response.status).toEqual(200)
        expect (response.body._id).toBeDefined()
        expect (response.body.id).toEqual(CreatorToCreate.id);
        expect (response.body.fullName).toEqual(CreatorToCreate.fullName)
        expect (response.body.thumbnail).toEqual(CreatorToCreate.thumbnail)
        expect (response.body.urls).toEqual(CreatorToCreate.urls)

    })

    it('Deve atualizar um Creator', async () => {
        const CreatorId = 100;

        const CreatorToCreate = {
            id: CreatorId,
            fullName: 'Stan Lee',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const CreatorToUpdate = {
            id: 101,
            fullName: 'Jack Kirby',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'tipo', url: 'htts://tipo.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        await comicsModel.create(CreatorToCreate)
        const response = await request.default(app).post(`/creator/${creatorsMock[0].id}`).send(CreatorToCreate)

        expect (response.status).toEqual(200)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(CreatorId)
        expect (response.body.fullName).toEqual(CreatorToUpdate.fullName)
        expect (response.body.resourceURI).toEqual(CreatorToUpdate.resourceURI)
        expect (response.body.urls).toEqual(CreatorToUpdate.urls)
        expect (response.body.thumbnail).toEqual(CreatorToUpdate.thumbnail)

    })

    it('Deve excluir o Creator', async () => {
        const CreatorId = 110;

        const CreatorToCreate = {
            id: CreatorId,
            fullName: 'Stan Lee',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        await creatorModel.create(CreatorToCreate)
        const response = (await request.default(app).delete(`/creator/${creatorsMock[0]}`));
        const FoundCreator = await creatorModel.findOne({id: CreatorId})

        expect (response.status).toEqual(200)
        expect (FoundCreator).toBe(null)
    })
})