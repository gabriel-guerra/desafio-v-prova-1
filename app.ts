import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

class App{
    express: express.Application;

    private middleware(): void{
        this.express.use(express.json());
    }

    private async database(){
        if (process.env.NODE_ENV !== 'test'){
            let collectionName = 'Desafio-V-SecretWars'
            try{
                mongoose.set("strictQuery", true);
                await mongoose.connect(`mongodb://0.0.0.0:27017/${collectionName}`);
                console.log("Connected to database");
            }catch(error){
                console.error(`Connection with database failed, error: `, error);
            }
        }
    }

    private router(): void{
        this.express.use(router);
    }

    constructor(){
        this.express = express();
        this.middleware();
        this.database();
        this.router();
    }

}

export default new App().express;