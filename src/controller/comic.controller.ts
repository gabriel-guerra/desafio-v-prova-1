import { Request, Response } from 'express';
import comicService from "../service/comic.service";

class ComicsController {
    async create (req: Request, res: Response) {
        const createdComics = await comicService.create(req.body);
        res.status(201);
        return res.json(createdComics)
    }

    async findAll(req: Request, res: Response) {
        const findedComics = await comicService.findAll();
        return res.json(findedComics)
    }

    async findById(req: Request, res: Response) {
        const findedComic = await comicService.findById(parseInt(req.params.id))
        return res.json(findedComic)
    }

    async update(req: Request, res: Response) {
        const comic = await comicService.findById(parseInt(req.params.id))
        req.body.id = comic?.id;

        const updatedComics = await comicService.update(comic?._id, req.body)
        return typeof(updatedComics) === 'string' ? res.status(404).send(updatedComics) : res.json(updatedComics);
    }

    async delete(req: Request, res: Response) {
        const comic = await comicService.findById(parseInt(req.params.id))
        const deleteComics = await comicService.delete(comic?._id)
        return deleteComics.includes('não encontrado') ? res.status(404).send(deleteComics) : res.send(deleteComics)
    }

    async biggestDescription(req: Request, res: Response){
        const foundComic = await comicService.biggestDescription()
        return res.json(foundComic)
    }

    async mostRecentEdition(req: Request, res: Response) {
        const findedComics = await comicService.mostRecentEdition(parseInt(req.params.id));
        return res.json(findedComics)
    } 

}

export default new ComicsController();
