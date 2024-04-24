import { Router } from 'express';
import hello from './src/hello';
import serieController from './src/controller/serie.controller';

const router = Router();

router.get("/hello", hello.helloWorld);

router.get("/serie/:title", serieController.findSerieByTitle);
router.get("/serie", serieController.findSerie);

export { router };