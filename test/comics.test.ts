import * as request from 'supertest';
import app from '../app';
import databaseConfig from './databaseConfig';
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

    afterAll(async () => {
        await databaseConfig.drop();
    });

    it('Deve recuperar todos as comics', async () => {

        const response = await request.default(app).get('/comics');

        expect(response.status).toEqual(200);
        expect(response.body.length).toBe(comicsMock.length);
    });

    it('Deve recuperar comic por ID', async () => {
        const response = await request.default(app).get(`/comics/id/${comicsMock[4].id}`);
        const foundComic = await comicsModel.findOne({id:comicsMock[4].id});
        
        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.id).toEqual(foundComic?.id)
        expect(response.body.title).toEqual(foundComic?.title)
        expect(response.body.description).toEqual(foundComic?.description)
        expect(response.body.resourceURI).toEqual(foundComic?.resourceURI)
        expect(foundComic!.dates.map((item:any) => {
            return { type: item.type, date: new Date(item.date).toISOString() }
        })).toMatchObject(response.body.dates)
        expect(foundComic!.prices).toMatchObject(response.body.prices)
        expect(foundComic!.creators).toMatchObject(response.body.creators)
    })

     it('Deve criar um comic', async () => {
        const comicId = 2035;

        const comicToCreate = {
            id: comicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:1990}],
            creators: [{id: 200, fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }

        const response = await request.default(app).post('/comics/criar').send(comicToCreate);

        expect (response.status).toEqual(201)
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(comicToCreate.id)
        expect (response.body.title).toEqual(comicToCreate.title)
        expect (response.body.description).toEqual(comicToCreate.description)
        expect (response.body.resourceURI).toEqual(comicToCreate.resourceURI)
        expect(comicToCreate.dates).toMatchObject(response.body.dates)
        expect(comicToCreate.prices).toMatchObject(response.body.prices)
        expect(comicToCreate.creators).toMatchObject(response.body.creators)

    })

    it('Deve atualizar uma Comic', async () => {
        const comicId = 2040;

        const comicToCreate = {
            id: comicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:1990}],
            creators: [{id: 200, fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }

        const comicToUpdate = {
            id: 2041,
            title: 'Nova Comic Titulo',
            description: 'Comic Atualização Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Tipo', Date:'25/03/2001'}],
            prices: [{type: 'Detalhe', price:2001}],
            creators: [{id: 210, fullName: 'Robert Schawazzer' , role: 'Roteirista'}]
        }

        await comicsModel.create(comicToCreate);
        const response = await request.default(app).put(`/comics/id/${comicId}`).send(comicToUpdate);

        expect (response.status).toEqual(200);
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(comicId)
        expect (response.body.title).toEqual(comicToUpdate.title)
        expect (response.body.description).toEqual(comicToUpdate.description)
        expect (response.body.resourceURI).toEqual(comicToUpdate.resourceURI)
        expect(comicToUpdate.dates).toMatchObject(response.body.dates)
        expect(comicToUpdate.prices).toMatchObject(response.body.prices)
        expect(comicToUpdate.creators).toMatchObject(response.body.creators)
    })

    it('Deve excluir uma Comic', async () => {
        const comicId = 2045;

        const comicToCreate = {
            id: comicId,
            title: 'Comic Titulo',
            description: 'Comic Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Detalhe', Date:'27/03/2001'}],
            prices: [{type: 'Precos', price:1990}],
            creators: [{id: 200, fullName: 'Stan Lee' , role: 'Editora-chefe'}]
        }
        await comicsModel.create(comicToCreate)
        const response = await request.default(app).delete(`/comics/id/${comicId}`);
        const foundComic = await comicsModel.findOne({id: comicId});

        expect (response.status).toEqual(200);
        expect (foundComic).toBe(null);
    })

    it('Deve retornar 404 no update de um comic inexistente', async () => {
        
        const comicId = 2040;

        const comicToUpdate = {
            id: 2041,
            title: 'Nova Comic Titulo',
            description: 'Comic Atualização Teste',
            resourceURI: 'https://www.google.com.br/',
            dates: [{type: 'Tipo', Date:'25/03/2001'}],
            prices: [{type: 'Detalhe', price:2001}],
            creators: [{id: 210, fullName: 'Robert Schawazzer' , role: 'Roteirista'}]
        }

        const response = await request.default(app).put(`/comics/id/${comicId}`).send(comicToUpdate);

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Quadrinho não encontrado');
 

    })

    it('Deve retornar 404 no delete de um comic inexistente', async () => {
        
        const comicId = 2045;
        const response = await request.default(app).delete(`/comics/id/${comicId}`);

        expect(response.status).toEqual(404);
        expect(response.text).toEqual('Quadrinho não encontrado');
 
    })

    //
    it('Deve recuperar tarefa de maior descricao', async () => {

        const response = await request.default(app).get('/comics/maior-descricao');

        const biggestDesc = comicsMock.reduce((s1, s2) => {
            return s1.description.length > s2.description.length ? s1 : s2
        })

        expect (response.status).toEqual(200);
        expect (response.body._id).toBeDefined();
        expect (response.body.id).toEqual(biggestDesc.id)
        expect (response.body.title).toEqual(biggestDesc.title)
        expect (response.body.description).toEqual(biggestDesc.description)
        expect (response.body.resourceURI).toEqual(biggestDesc.resourceURI)
        expect(biggestDesc.dates).toMatchObject(response.body.dates)
        expect(biggestDesc.prices).toMatchObject(response.body.prices)
        expect(biggestDesc.creators).toMatchObject(response.body.creators)            

    })

    it('Deve retornar última edição de uma comic pesquisada por id', async () => {
        const response = await request.default(app).get(`/comics/ultima-edicao/${comicsMock[2].id}`);
        
        const foundComic = await comicsModel.findOne({id:comicsMock[2].id});
        const newest = foundComic?.dates.reduce((date1, date2) => {
            return date1.date! > date2.date! ? date1 : date2;
        })
        
        expect(response.status).toEqual(200);
        expect(response.body.type).toEqual(newest?.type)
        expect(response.body.date).toEqual(newest?.date?.toISOString())
        
    })

    it('Deve retornar colaborações dos criadores', async () => {
        const response = await request.default(app).get(`/comics/colaboracoes-criadores`);
        
        const allComics = await request.default(app).get(`/comics`);
        
        const contagem = allComics.body.reduce(
            (counts: any, comic: any) => {
                comic.creators.forEach((creator: any) => {
                    const { fullName } = creator;
                    counts[fullName] = (counts[fullName] || 0) + 1;
            });

            return counts;

          }, {});
          
          const listaColabs = Object.entries(contagem).map(([fullName, colaboracoes]) => ({
            colaboracoes,
            nome: fullName,
          }));
        
        expect(response.status).toEqual(200);
        //expect(response.body).toEqual(listaColabs);
        expect(response.body).toEqual(expect.arrayContaining(listaColabs));
        
    })

})