import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import apiContent from './src/api-content';

class App{
    express: express.Application;

    private middleware(): void{
        this.express.use(express.json());
    }

    private async database(){        
        let collectionName = 'desafio-v-gs'
        try{
            mongoose.set("strictQuery", true);
            await mongoose.connect(`mongodb://0.0.0.0:27017/${collectionName}`);
            console.log("Connected to database");
        }catch(error){
            console.error(`Connection with database failed, error: `, error);
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
        apiContent.fillSeries();
    }

}

export default new App().express;