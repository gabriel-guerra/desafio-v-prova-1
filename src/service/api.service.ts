import serieRepository from "../repository/serie.repository";
import comicsRepository from "../repository/comics.repository";
import { ts, apikey, hash } from "../../config";
import characterRepository from "../repository/character.repository";

class ApiService{

    async exec(){
        
        const series = await serieRepository.findAllSeries();
        
        if (series.length === 0){
            
            await this.fillSeries();
            const serie = (await serieRepository.findAllSeries())[0];

            Promise.all([

                this.fillComics(serie.comics),
                this.fillCharacters(serie.characters)

            ])
        }
        
    }

    async fetchOffset(url: any, total: number){

        let allItems: any = [];
        let urls: any = [];

        for (let i = 0; i < total; i += 100){
            urls.push(url + `?${ts}&${apikey}&${hash}&limit=100&offset=${i}`)
        }

        const promises = urls.map(
            (link: any) => fetch(link).then((res) => res.json())
        );

        allItems = Promise.all(promises)
        .then((responses) => {
            const arrays = responses.map((item) => item.data.results);
            return arrays.flatMap((array) => array);
        })

        return allItems;

    }


    async fillSeries(){    

        const secretWars: any = await fetch(`http://gateway.marvel.com/v1/public/series/2063?${ts}&${apikey}&${hash}&limit=100`)
            .then((res) => res.json()
        );

        let comics: any;
        let stories: any;
        let characters: any;
        let creators: any;
        let events: any;

        Promise.all([

            comics = await fetch(secretWars.data.results[0].comics.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            ),

            stories = await fetch(secretWars.data.results[0].stories.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            ),

            characters = await fetch(secretWars.data.results[0].characters.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            ),

            creators = await fetch(secretWars.data.results[0].creators.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            ),

            events = await fetch(secretWars.data.results[0].events.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            )

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

        comics.forEach(async (element: any) => {
           
            const fetchResult: any = await fetch(`http://gateway.marvel.com/v1/public/comics/${element.id}?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            );

            let series: any;
            let creators: any;
            let characters: any;
            let stories: any;
            let events: any;

            Promise.all([
    
                series = await fetch(fetchResult.data.results[0].series.resourceURI + `?${ts}&${apikey}&${hash}&limit=100`)
                    .then((res) => res.json()
                ),

                creators = await fetch(fetchResult.data.results[0].creators.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                    .then((res) => res.json()
                ),
    
                characters = await fetch(fetchResult.data.results[0].characters.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                    .then((res) => res.json()
                ),

                stories = await fetch(fetchResult.data.results[0].stories.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                    .then((res) => res.json()
                ),

                events = await fetch(fetchResult.data.results[0].events.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                    .then((res) => res.json()
                )
    
            ]);

            let obj = { 
                id: fetchResult.data.results[0].id, 
                title: fetchResult.data.results[0].title,
                issueNumber: fetchResult.data.results[0].issueNumber,
                description: fetchResult.data.results[0].description,
                format: fetchResult.data.results[0].format,
                pageCount: fetchResult.data.results[0].pageCount,
                textObjects: fetchResult.data.results[0].textObjects.map((textObject: {type: String, language: String, text: String}) => {
                    return { type_: textObject.type, language: textObject.language, text: textObject.text };
                }),
                resourceURI: fetchResult.data.results[0].resourceURI,
                series: series.data.results.map((serie: { id: Number, title: String; }) => {
                    return { id: serie.id, title: serie.title};
                }),
                prices: fetchResult.data.results[0].prices.map((price: {type: String, price: Number}) => {
                    return { type_: price.type, price: price.price };
                }),
                creators: creators.data.results.map((creator: { id: Number, fullName: String; }) => {
                    return { id: creator.id, fullName: creator.fullName };
                }),
                characters: characters.data.results.map((character: { id: Number, name: String; }) => {
                    return { id: character.id, name: character.name};
                }),
                stories: stories.data.results.map((story: { id: Number, title: String }) => {
                    return { id: story.id, title: story.title };
                }),
                events: events.data.results.map((event: { id: Number, title: String; }) => {
                    return { id: event.id, title: event.title };
                })
            }

            await comicsRepository.createComics(obj);

        });

    }

    async fillCharacters(characters: any){

        characters.forEach(async (element: any) => {
           
            const fetchResult: any = await fetch(`http://gateway.marvel.com/v1/public/characters/${element.id}?${ts}&${apikey}&${hash}&limit=100`)
                .then( async (res) => res.json()
            );

            let series: any;
            let comics: any;
            let stories: any;
            let events: any;

            Promise.all([
    
                series = await this.fetchOffset(fetchResult.data.results[0].series.collectionURI, fetchResult.data.results[0].series.available),
    
                comics = await this.fetchOffset(fetchResult.data.results[0].comics.collectionURI, fetchResult.data.results[0].comics.available),

                stories = await this.fetchOffset(fetchResult.data.results[0].stories.collectionURI, fetchResult.data.results[0].stories.available),

                events = await this.fetchOffset(fetchResult.data.results[0].events.collectionURI, fetchResult.data.results[0].events.available)
    
            ]);

            let obj = { 
                id: fetchResult.data.results[0].id, 
                name: fetchResult.data.results[0].name,
                description: fetchResult.data.results[0].description,
                resourceURI: fetchResult.data.results[0].resourceURI,
                series: series.map((serie: { id: Number, title: String; }) => {
                    return { id: serie.id, title: serie.title};
                }),
                comics: comics.map((character: { id: Number, name: String; }) => {
                    return { id: character.id, name: character.name};
                }),
                stories: stories.map((story: { id: Number, title: String }) => {
                    return { id: story.id, title: story.title };
                }),
                events: events.map((event: { id: Number, title: String; }) => {
                    return { id: event.id, title: event.title };
                })
            }

            await characterRepository.createCharacter(obj);

        });

    }

}


export default new ApiService();
