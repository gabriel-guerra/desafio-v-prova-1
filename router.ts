import { Router } from 'express';
import hello from './src/hello';
import serieController from './src/controller/serie.controller';
import apiController from './src/controller/api.controller';

const router = Router();

router.get("/hello", hello.helloWorld);

router.get("/fill-database", apiController.fillDatabase)

router.get("/serie/:title", serieController.findSerieByTitle);
router.get("/serie", serieController.findSerie);

export { router };