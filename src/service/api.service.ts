import serieRepository from "../repository/serie.repository";
import { ts, apikey, hash } from "../../config";

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

        const secretWars: any = await fetch(`http://gateway.marvel.com/v1/public/series/2063?${ts}&${apikey}&${hash}&limit=40`)
        .then( async (res: Response) => {
            return await res.json();
        });

        let comics: any;
        let stories: any;
        let characters: any;
        let creators: any;
        let events: any;

        Promise.all([

            comics = await fetch(secretWars.data.results[0].comics.collectionURI + `?${ts}&${apikey}&${hash}&limit=40`)
            .then( async (res: Response) => {
                return await res.json();
            }),

            stories = await fetch(secretWars.data.results[0].stories.collectionURI + `?${ts}&${apikey}&${hash}&limit=40`)
            .then( async (res: Response) => {
                return await res.json();
            }),

            characters = await fetch(secretWars.data.results[0].characters.collectionURI + `?${ts}&${apikey}&${hash}&limit=40`)
            .then( async (res: Response) => {
                return await res.json();
            }),

            creators = await fetch(secretWars.data.results[0].creators.collectionURI + `?${ts}&${apikey}&${hash}&limit=40`)
            .then( async (res: Response) => {
                return await res.json();
            }),

            events = await fetch(secretWars.data.results[0].events.collectionURI + `?${ts}&${apikey}&${hash}&limit=40`)
            .then( async (res: Response) => {
                return await res.json();
            })

        ]);

        let obj = {
            id: secretWars.data.results[0].id, 
            title: secretWars.data.results[0].title,
            description: secretWars.data.results[0].description,
            resourceURI: secretWars.data.results[0].resourceURI,
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

    async fillComics(comics: any){

       /*  comics.forEach(element => {
            

            //


        }); */

    }

}


export default new ApiService();
