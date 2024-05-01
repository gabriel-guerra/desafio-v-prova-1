import { Router } from 'express';
import hello from './src/hello';
import serieController from './src/controller/serie.controller';
import apiController from './src/controller/api.controller';
import characterController from './src/controller/character.controller';

const router = Router();

router.get("/hello", hello.helloWorld);

router.get("/fill-database", apiController.fillDatabase)

//serie
router.get("/series", serieController.findAll);

//comics

//character
router.get('/personagens', characterController.findAll)
router.get('/personagens/:id', characterController.findById)
router.post('/personagens', characterController.create)
router.put('/personagens/:id', characterController.update)
router.delete('/personagens/:id', characterController.delete)

//creator

export { router };