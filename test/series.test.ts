import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig'
import { seriesMock } from './mock/series.mock';
import serieModel from '../src/model/serie.model';

describe('Testes das séries', () => {
    
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

    it('Deve recuperar todas as séries', async () => {
        
        const response = await request.default(app).get('/series');

        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(seriesMock.length);
        
    })

    it('Deve recuperar série pelo id', async () => {

        const response = await request.default(app).get(`/series/${seriesMock[0].id}`);
        const foundSerie = await serieModel.findOne({id: seriesMock[0].id})

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(foundSerie?.id)
        expect(response.body.title).toEqual(foundSerie?.title)
        expect(response.body.description).toEqual(foundSerie?.description)
        expect(response.body.resourceURI).toEqual(foundSerie?.resourceURI)
        expect(response.body.startYear).toEqual(foundSerie?.startYear)
        expect(response.body.endYear).toEqual(foundSerie?.endYear)
        expect(foundSerie!.comics).toMatchObject(response.body.comics)
        expect(foundSerie!.characters).toMatchObject(response.body.characters)
        expect(foundSerie!.creators).toMatchObject(response.body.creators)
    })


    it('Deve criar uma série', async() => {

        const serieId = 10;

        const serieToCreate = {
            id: serieId, 
            title: "Serie 1",
            description: "Serie de quadrinhos",
            resourceURI: "https://google.com",
            startYear: 1980,
            endYear: 1997,
            comics: [{ id: 1, title: "comic 1"}, {id: 2, title: "comic 2"}],
            characters: [{ id: 3, name: "Capitão"}, {id: 4, name: "Caveira"}],
            creators: [{ id: 5, fullName: "João Silva", role: "Desenhista"}, {id: 6, fullName: "Maria Souza", role: "Editora-chefe"}]
        }

        const response = await request.default(app).post('/series/criar').send(serieToCreate);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(serieToCreate.id)
        expect(response.body.title).toEqual(serieToCreate.title)
        expect(response.body.description).toEqual(serieToCreate.description)
        expect(response.body.resourceURI).toEqual(serieToCreate.resourceURI)
        expect(response.body.startYear).toEqual(serieToCreate.startYear)
        expect(response.body.endYear).toEqual(serieToCreate.endYear)
        expect(serieToCreate.comics).toMatchObject(response.body.comics)
        expect(serieToCreate.characters).toMatchObject(response.body.characters)
        expect(serieToCreate.creators).toMatchObject(response.body.creators)
 
    })

    it('Deve atualizar uma série', async () => {
        
        const serieId = 20;

        const serieToCreate = {
            id: serieId, 
            title: "Serie 1",
            description: "Serie de quadrinhos",
            resourceURI: "https://google.com",
            startYear: 1980,
            endYear: 1997,
            comics: [{ id: 1, title: "comic 1"}, {id: 2, title: "comic 2"}],
            characters: [{ id: 3, name: "Capitão"}, {id: 4, name: "Caveira"}],
            creators: [{ id: 5, fullName: "João Silva", role: "Desenhista"}, {id: 6, fullName: "Maria Souza", role: "Editora-chefe"}]
        }

        const serieToUpdate = {
            id: 30, 
            title: "Atualização de série",
            description: "Nova atualização da série de quadrinhos",
            resourceURI: "https://translate.google.com",
            startYear: 2009,
            endYear: 2015,
            comics: [{ id: 31, title: "Comic 99"}, {id: 32, title: "Comic 98"}],
            characters: [{ id: 33, name: "Sargento"}, {id: 34, name: "Delegado"}],
            creators: [{ id: 35, fullName: "Amanda Nunes", role: "Roteirista"}, {id: 36, fullName: "Patrícia Cardoso", role: "Designer"}]
        }

        await serieModel.create(serieToCreate);
        const response = await request.default(app).put(`/series/${serieId}`).send(serieToUpdate);

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body?.id).toBe(serieId);
        expect(response.body?.title).toBe(serieToUpdate.title);
        expect(response.body?.description).toBe(serieToUpdate.description);
        expect(response.body?.resourceURI).toBe(serieToUpdate.resourceURI);
        expect(response.body?.startYear).toEqual(serieToUpdate.startYear);
        expect(response.body?.endYear).toEqual(serieToUpdate.endYear);
        expect(serieToUpdate.comics).toMatchObject(response.body.comics)
        expect(serieToUpdate.characters).toMatchObject(response.body.characters)
        expect(serieToUpdate.creators).toMatchObject(response.body.creators)
 

    })

    it('Deve excluir uma série', async () => {

        const serieId = 40;

        const serieToCreate = {
            id: serieId, 
            title: "Serie 1",
            description: "Serie de quadrinhos",
            resourceURI: "https://google.com",
            startYear: 1980,
            endYear: 1997,
            comics: [{ id: 1, title: "comic 1"}, {id: 2, title: "comic 2"}],
            characters: [{ id: 3, name: "Capitão"}, {id: 4, name: "Caveira"}],
            creators: [{ id: 5, fullName: "João Silva", role: "Desenhista"}, {id: 6, fullName: "Maria Souza", role: "Editora-chefe"}]
        }

        await serieModel.create(serieToCreate);
        const response = await request.default(app).delete(`/series/${serieId}`);
        const foundSerie = await serieModel.findOne({id: serieId});

        expect(response.status).toEqual(200);
        expect(foundSerie).toBe(null);

    })

    it('Deve retornar 404 no update de uma série inexistente', async () => {
        
        const serieId = 20;

        const serieToUpdate = {
            id: 30, 
            title: "Atualização de série",
            description: "Nova atualização da série de quadrinhos",
            resourceURI: "https://translate.google.com",
            startYear: 2009,
            endYear: 2015,
            comics: [{ id: 31, title: "Comic 99"}, {id: 32, title: "Comic 98"}],
            characters: [{ id: 33, name: "Sargento"}, {id: 34, name: "Delegado"}],
            creators: [{ id: 35, fullName: "Amanda Nunes", role: "Roteirista"}, {id: 36, fullName: "Patrícia Cardoso", role: "Designer"}]
        }

        const response = await request.default(app).put(`/series/${serieId}`).send(serieToUpdate);

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Série não encontrada');
 

    })

    it('Deve retornar 404 no delete de uma série inexistente', async () => {
        
        const serieId = 20;
        const response = await request.default(app).delete(`/series/${serieId}`);

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Série não encontrada');
 
    })

})