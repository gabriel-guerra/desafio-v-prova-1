import { ts, apikey, hash } from "../../config";
import serieRepository from "../repository/serie.repository";
import comicsRepository from "../repository/comics.repository";
import characterRepository from "../repository/character.repository";
import creatorRepository from "../repository/creator.repository";

class ApiService{

    async exec(){
        
        const series = await serieRepository.findAllSeries();
        
        if (series.length === 0){
            
            await this.fillSeries();
            const serie = (await serieRepository.findAllSeries())[0];

            Promise.all([

                this.fillComics(serie.comics),
                this.fillCharacters(serie.characters),
                this.fillCreators(serie.creators)

            ])

            return "OK"
        }else{
            return "Banco de dados já preenchido."
        }
        
    }

    async fillSeries(){    

        const secretWars: any = await fetch(`http://gateway.marvel.com/v1/public/series/2063?${ts}&${apikey}&${hash}&limit=100`)
            .then((res) => res.json()
        );

        let comics: any;
        let characters: any;

        Promise.all([

            comics = await fetch(secretWars.data.results[0].comics.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            ),

            characters = await fetch(secretWars.data.results[0].characters.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
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
            characters: characters.data.results.map((character: { id: Number, name: String; }) => {
                return { id: character.id, name: character.name};
            }),
            creators: secretWars.data.results[0].creators.items.map((creator: { resourceURI: String, name: String, role: String}) => {
                const array = creator.resourceURI.split('/');
                const id = array[array.length -1];

                return { id: id, fullName: creator.name, role: creator.role};
            })
        }

        await serieRepository.createSerie(obj);
        
    }

    async fillComics(comics: any){

        comics.forEach(async (element: any) => {
           
            const fetchResult: any = await fetch(`http://gateway.marvel.com/v1/public/comics/${element.id}?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            );

            let characters: any;

            Promise.all([
    
                characters = await fetch(fetchResult.data.results[0].characters.collectionURI + `?${ts}&${apikey}&${hash}&limit=100`)
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
                dates: fetchResult.data.results[0].dates.map((date: {type: String, date: String}) => {
                    if(date.date === "-0001-11-30T00:00:00-0500"){
                        date.date = "0001-11-30T00:00:00-0500"
                    }
                    return { type_: date.type, date: date.date };
                }),
                prices: fetchResult.data.results[0].prices.map((price: {type: String, price: Number}) => {
                    return { type_: price.type, price: price.price };
                }),
                creators: fetchResult.data.results[0].creators.items.map((creator: { resourceURI: String, name: String, role: String}) => {
                    const array = creator.resourceURI.split('/');
                    const id = array[array.length -1];
    
                    return { id: id, fullName: creator.name, role: creator.role};
                }),
                characters: characters.data.results.map((character: { id: Number, name: String; }) => {
                    return { id: character.id, name: character.name};
                })
            }

            await comicsRepository.createComics(obj);

        });

    }

    async fillCharacters(characters: any){

        characters.forEach(async (element: any) => {
           
            const fetchResult: any = await fetch(`http://gateway.marvel.com/v1/public/characters/${element.id}?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            );

            let obj = { 
                id: fetchResult.data.results[0].id, 
                name: fetchResult.data.results[0].name,
                description: fetchResult.data.results[0].description,
                resourceURI: fetchResult.data.results[0].resourceURI,
                urls: fetchResult.data.results[0].urls.map((link: {type: String, url: String}) => {
                    return { type_: link.type, url: link.url };
                }),
                thumbnail: fetchResult.data.results[0].thumbnail
            }

            await characterRepository.createCharacter(obj);

        });

    }

    async fillCreators(creators: any){

        creators.forEach(async (element: any) => {
           
            const fetchResult: any = await fetch(`http://gateway.marvel.com/v1/public/creators/${element.id}?${ts}&${apikey}&${hash}&limit=100`)
                .then((res) => res.json()
            );

            let obj = { 
                id: fetchResult.data.results[0].id, 
                fullName: fetchResult.data.results[0].fullName,
                resourceURI: fetchResult.data.results[0].resourceURI,
                thumbnail: fetchResult.data.results[0].thumbnail,
                urls: fetchResult.data.results[0].urls.map((link: {type: String, url: String}) => {
                    return { type_: link.type, url: link.url };
                })
            }

            await creatorRepository.createCreator(obj);

        });

    }

}


export default new ApiService();
