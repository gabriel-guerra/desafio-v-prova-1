import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

class App{
    express: express.Application;

    private docs(){
        const swaggerOptions = {
            swaggerDefinition: {
                info: {
                    title: 'Prova 1 - Desafio Profissional 5',
                    version: '1.0.0'
                }
            },
            apis: ['./documentation/serie-doc.yaml', './documentation/character-doc.yaml', './documentation/comics-doc.yaml', './documentation/creator-doc.yaml']
    }

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
   }   

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
        this.docs();
    }

}

export default new App().express;