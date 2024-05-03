import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig'
import { comicsMock } from './mock/comics.mock';
import comicsModel from '../src/model/comics.model';


describe('Testes dos quadrinhos', () => {

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
    });

    it('Deve recuperar todos as comics', async () => {

        const response = await request.default(app).get('/comics');

        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(comicsMock.length);
    });

    it('Deve recuperar comic por ID', async () => {
        const response = await request.default(app).get(`/comics/${comicsMock[0].id}`);
        const FoundComic = await comicsModel.findOne({id:comicsMock[0].id});

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(FoundComic?.id)
        expect(response.body.title).toEqual(FoundComic?.title)
        expect(response.body.description).toEqual(FoundComic?.description)
        expect(response.body.resourceURI).toEqual(FoundComic?.resourceURI)
        //expect(response.body.creator).toEqual(FoundComic?.creators)
        expect(response.body.prices).toEqual(FoundComic?.prices)
        expect(response.body.dates).toEqual(FoundComic?.dates)

    })

    it('Deve criar um comic', async () => {
        const ComicId = 2035;

        const ComicToCreate = {
            id: ComicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:'1990'}],
            creators: [{id: '200', fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }

        const response = await request.default(app).post('/comics/criar').send(ComicToCreate);

        expect (response.status).toEqual(201)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(ComicToCreate.id)
        expect (response.body.title).toEqual(ComicToCreate.title)
        expect (response.body.description).toEqual(ComicToCreate.description)
        expect (response.body.resourceURI).toEqual(ComicToCreate.resourceURI)
        expect (response.body.dates).toEqual(ComicToCreate.dates)
        expect (response.body.prices).toEqual(ComicToCreate.prices)
        expect (response.body.creators).toEqual(ComicToCreate.creators)

    })

    it('Deve atualizar uma Comic', async () => {
        const ComicId = 2040;

        const ComicToCreate = {
            id: ComicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:'1990'}],
            creators: [{id: '200', fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }

        const ComicToUpdate = {
            id: 2041,
            title: 'Nova Comic Titulo',
            description: 'Comic Atualização Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Tipo', Date:'25/03/2001'}],
            prices: [{type: 'Detalhe', price:'2001'}],
            creators: [{id: '210', fullName: 'Robert Schawazzer' , role: 'Roteirista'}]
        }

        await comicsModel.create(ComicToCreate);
        const response = await request.default(app).put(`/comics/${comicsMock[0]}`).send(ComicToCreate);

        expect (response.status).toEqual(200);
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(ComicId)
        expect (response.body.title).toEqual(ComicToUpdate.title)
        expect (response.body.description).toEqual(ComicToUpdate.description)
        expect (response.body.resourceURI).toEqual(ComicToUpdate.resourceURI)
        expect (response.body.dates).toEqual(ComicToUpdate.dates)
        expect (response.body.prices).toEqual(ComicToUpdate.prices)
        expect (response.body.creators).toEqual(ComicToUpdate.creators)
    })

    it('Deve excluir uma Comic', async () => {
        const ComicId = 2045;

        const ComicToCreate = {
            id: ComicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:'1990'}],
            creators: [{id: '200', fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }
        await comicsModel.create(ComicToCreate)
        const response = await request.default(app).delete(`/comics/${comicsMock[0]}`);
        const FoundComic = await comicsModel.findOne({id: ComicId});

        expect (response.status).toEqual(200);
        expect (FoundComic).toBe(null);
    })

})