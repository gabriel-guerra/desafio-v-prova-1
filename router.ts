import { Router } from 'express';
import hello from './src/hello';
import serieController from './src/controller/serie.controller';
import apiController from './src/controller/api.controller';
import characterController from './src/controller/character.controller';
import comicController from './src/controller/comic.controller';
import creatorController from './src/controller/creator.controller';

const router = Router();

router.get("/hello", hello.helloWorld);

router.get("/fill-database", apiController.fillDatabase)

//serie
router.get("/series", serieController.findAll)
router.get('/series/id/:id', serieController.findById)
router.post('/series/criar', serieController.create)
router.put('/series/id/:id', serieController.update)
router.delete('/series/id/:id', serieController.delete)

//comic
router.get('/comics', comicController.findAll)
router.get('/comics/id/:id', comicController.findById)
router.post('/comics/criar', comicController.create)
router.put('/comics/id/:id', comicController.update)
router.delete('/comics/id/:id', comicController.delete)
router.get('/comics/maior-descricao', comicController.biggestDescription)
router.get('/comics/ultima-edicao/:id', comicController.mostRecentEdition)
router.get('/comics/colaboracoes-criadores', comicController.creatorsCollabCount)

//character
router.get('/personagens', characterController.findAll)
router.get('/personagens/id/:id', characterController.findById)
router.post('/personagens/criar', characterController.create)
router.put('/personagens/id/:id', characterController.update)
router.delete('/personagens/id/:id', characterController.delete)
router.get('/personagens/nome-composto',characterController.twoOrMoreNames)
router.get('/personagens/nome-dec', characterController.namesReverseOrder)

//creator
router.get('/creator', creatorController.findAll)
router.get('/creator/id/:id', creatorController.findById)
router.post('/creator/criar', creatorController.create)
router.put('/creator/id/:id', creatorController.update)
router.delete('/creator/id/:id', creatorController.delete)

export { router };