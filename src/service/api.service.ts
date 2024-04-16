import serieRepository from "../repository/serie.repository";
import { serieType } from "../types/serie.type";


class ApiService{


    async exec(){
        
        const series = await serieRepository.findAllSeries();
        
        if (series.length === 0){
            
            await this.fillSeries();
            const serie = (await serieRepository.findAllSeries())[0];

            Promise.all([

                this.fillComics(serie.comics)

            ])
        }
        
    }

    async fillSeries(){    

        const secretWars: any = await fetch("http://gateway.marvel.com/v1/public/series/2063?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
        .then( async (res: Response) => {
            return await res.json();
        });

        let comics: any;
        let stories: any;
        let characters: any;
        let creators: any;
        let events: any;

        Promise.all([

            comics = await fetch(secretWars.data.results[0].comics.collectionURI + "?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
            .then( async (res: Response) => {
                return await res.json();
            }),

            stories = await fetch(secretWars.data.results[0].stories.collectionURI + "?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
            .then( async (res: Response) => {
                return await res.json();
            }),

            characters = await fetch(secretWars.data.results[0].characters.collectionURI + "?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
            .then( async (res: Response) => {
                return await res.json();
            }),

            creators = await fetch(secretWars.data.results[0].creators.collectionURI + "?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
            .then( async (res: Response) => {
                return await res.json();
            }),

            events = await fetch(secretWars.data.results[0].events.collectionURI + "?ts=777&apikey=83d9fb1f0d0e5ad1f51ad6c53b1b1382&hash=31116a2567b2aa6501fe9349dc42d110&limit=40")
            .then( async (res: Response) => {
                return await res.json();
            })

        ]);

        let obj = {
            id: secretWars.data.results[0].id, 
            title: secretWars.data.results[0].title,
            description: secretWars.data.results[0].description,
            url: secretWars.data.results[0].resourceURI,
            startYear: secretWars.data.results[0].startYear,
            endYear: secretWars.data.results[0].endYear,
            comics: comics.data.results.map((comic: { id: Number, title: String; }) => {
                return { id: comic.id, title: comic.title };
            }),
            stories: stories.data.results.map((story: { id: Number, title: String }) => {
                return { id: story.id, title: story.title };
            }),
            characters: characters.data.results.map((character: { id: Number, name: String; }) => {
                return { id: character.id, name: character.name};
            }),
            creators: creators.data.results.map((creator: { id: Number, fullName: String; }) => {
                return { id: creator.id, fullName: creator.fullName };
            }),
            events: events.data.results.map((event: { id: Number, title: String; }) => {
                return { id: event.id, title: event.title };
            })
        }

        await serieRepository.createSerie(obj);
        
    }

    async fillComics(comics){

        //Aqui está recebendo um array com todos os objetos comics dentro das series;
        //Extrair todos os ids, dar fetch em cada um deles e criar um comic a partir do que foi encontrado
        //Criar a model

    }

}


export default new ApiService();
