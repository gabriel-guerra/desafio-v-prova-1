import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig'
import { seriesMock } from './mock/series.mock';
import serieModel from '../src/model/serie.model';

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
        //expect(response.body.comics).toEqual(foundSerie?.comics)
        //expect(response.body.characters).toEqual(foundSerie?.characters)
        //expect(response.body.creators).toEqual(foundSerie?.creators)
        
    })


    it('Deve criar uma série', async() => {

        const serieToCreate = {
            id: 100, 
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
        //expect(response.body.comics).toEqual(serieToCreate.comics)
        //expect(response.body.characters).toEqual(serieToCreate.characters)
        //expect(response.body.creators).toEqual(serieToCreate.creators)
 
    })

    it('Deve atualizar uma série', async () => {
        
        const serieId = 200;

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
            id: 999, 
            title: "Atualização de série",
            description: "Nova atualização da série de quadrinhos",
            resourceURI: "https://translate.google.com",
            startYear: 2009,
            endYear: 2015,
            comics: [{ id: 99, title: "Comic 99"}, {id: 98, title: "Comic 98"}],
            characters: [{ id: 97, name: "Sargento"}, {id: 96, name: "Delegado"}],
            creators: [{ id: 95, fullName: "Amanda Nunes", role: "Roteirista"}, {id: 94, fullName: "Patrícia Cardoso", role: "Designer"}]
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
        //expect(response.body?.comics).toEqual(serieToUpdate.comics);
        //expect(response.body?.characters).toEqual(serieToUpdate.characters);
        //expect(response.body?.creators).toEqual(serieToUpdate.creators);

    })

    it('Deve Excluir um usuário', async () => {

        const serieId = 300;

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

})