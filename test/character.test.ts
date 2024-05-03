import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig'
import { charactersMock } from './mock/characters.mock';
import characterModel from '../src/model/character.model';

describe('Testes dos usuários', () => {
    
    beforeAll(() => {
        return databaseConfig.connectDatabase();
    });

    beforeEach(() => {
        return databaseConfig.setup();
    })

    afterEach(() => {
        return databaseConfig.cleanup();
    })

    afterAll(async () => {
        await databaseConfig.drop();
    })

    it('Deve recuperar todos os personagens', async () => {
        
        const response = await request.default(app).get('/personagens');

        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(charactersMock.length);
        
    })

    it('Deve recuperar personagem pelo id', async () => {

        const response = await request.default(app).get(`/personagens/${charactersMock[14].id}`);
        const foundCharacter = await characterModel.findOne({id: charactersMock[14].id})

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(foundCharacter?.id)
        expect(response.body.name).toEqual(foundCharacter?.name)
        expect(response.body.description).toEqual(foundCharacter?.description)
        expect(response.body.resourceURI).toEqual(foundCharacter?.resourceURI)
        expect(foundCharacter?.urls).toMatchObject(response.body.urls)
        expect(response.body.thumbnail).toEqual(foundCharacter?.thumbnail)
        
    })


    it('Deve criar um personagem', async() => {

        const characterId = 210;

        const characterToCreate = {
            id: characterId,
            name: 'Personagem Principal',
            description: 'Personagem criado para validação de testes',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const response = await request.default(app).post('/personagens/criar').send(characterToCreate);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(characterToCreate.id)
        expect(response.body.name).toEqual(characterToCreate.name)
        expect(response.body.description).toEqual(characterToCreate.description)
        expect(response.body.resourceURI).toEqual(characterToCreate.resourceURI)
        expect(characterToCreate.urls).toMatchObject(response.body.urls)
        expect(response.body.thumbnail).toEqual(characterToCreate.thumbnail)
 
    })

    it('Deve atualizar um personagem', async () => {
        
        const characterId = 220;

        const characterToCreate = {
            id: characterId,
            name: 'Personagem Principal',
            description: 'Personagem criado para validação de testes',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        const characterToUpdate = {
            id: 999,
            name: 'Personagem Secundário',
            description: 'Atualização de um personagem',
            resourceURI: 'https://uri.character.com',
            urls: [{ type_: 'wiki', url: 'htts://wiki.url.com' }],
            thumbnail: { path: 'https://thumbnail.thumb.com', extension: 'png'}
        }

        await characterModel.create(characterToCreate);
        const response = await request.default(app).put(`/personagens/${characterId}`).send(characterToUpdate);

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(characterId)
        expect(response.body.name).toEqual(characterToUpdate.name)
        expect(response.body.description).toEqual(characterToUpdate.description)
        expect(response.body.resourceURI).toEqual(characterToUpdate.resourceURI)
        expect(characterToUpdate.urls).toMatchObject(response.body.urls)
        expect(response.body.thumbnail).toEqual(characterToUpdate.thumbnail)

    })

    it('Deve excluir um personagem', async () => {

        const characterId = 230;

        const characterToCreate = {
            id: characterId,
            name: 'Personagem Principal',
            description: 'Personagem criado para validação de testes',
            resourceURI: 'https://google.com',
            urls: [{ type_: 'detalhe', url: 'htts://detalhe.url.com' }],
            thumbnail: { path: 'https://url.thumbnail.com', extension: 'jpg'}
        }

        await characterModel.create(characterToCreate);
        const response = await request.default(app).delete(`/personagens/${characterId}`);
        const foundCharacter = await characterModel.findOne({id: characterId});

        expect(response.status).toEqual(200);
        expect(foundCharacter).toBe(null);

    })

})