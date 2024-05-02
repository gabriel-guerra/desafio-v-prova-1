import { randomUUID } from 'crypto';
import mongoose, { mongo } from 'mongoose'
import { charactersMock } from './mock/characters.mock';
import { comicsMock } from './mock/comics.mock';
import { creatorsMock } from './mock/creators.mock';
import { seriesMock } from './mock/series.mock';
import serieModel from '../src/model/serie.model';
import comicsModel from '../src/model/comics.model';
import characterModel from '../src/model/character.model';
import creatorModel from '../src/model/creator.model';

class DatabaseConfig{

    async connectDatabase(){
        const random = randomUUID().slice(0,4);

        try {
            mongoose.set("strictQuery", true);
            await mongoose.connect(`mongodb://0.0.0.0:27017/test-secretWars-${random}`);
            console.log(`Connected to db: test-secretWars-${random}`);
        } catch (error) {
            console.error(`Failed to connect to db: ${error}`);
        }
    }

    async setup(){
        await Promise.all([
            this.fillSeries(),
            this.fillComics(),
            this.fillCharacters(),
            this.fillCreators()
        ])
    }

    async cleanup(){
        await Promise.all([
            serieModel.deleteMany(),
            comicsModel.deleteMany(),
            characterModel.deleteMany(),
            creatorModel.deleteMany()
        ])
    }

    async drop(){
        mongoose.connection.db.dropDatabase();
    }

    private async fillSeries(){
        await Promise.all(seriesMock.map(serie => serieModel.create(serie)))
    }

    private async fillComics(){
        await Promise.all(comicsMock.map(comicBook => comicsModel.create(comicBook)))
    }

    private async fillCharacters(){
        await Promise.all(charactersMock.map(character => characterModel.create(character)))
    }

    private async fillCreators(){
        await Promise.all(creatorsMock.map(creator => creatorModel.create(creator)))
    }
}

export default new DatabaseConfig();