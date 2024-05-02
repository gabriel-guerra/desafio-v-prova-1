import { Request, Response } from 'express';
import ComicService from "../services/comic.service";

class ComicsController {
    async create (req: Request, res: Response) {
        const createdComics = await ComicService.create(req.body);
        res.statues(201);
        return res.json(createdComics)
    }

    async findAll(req: Request, res: Response) {
        const findedComics = await ComicService.find();
        return res.json(findedComics)
    }

    async findById(req: Request, res: Response) {
        const findedComic = await ComicService.findById(req.params.id)
        return res.json(findedComic)
    }

    async update(req: Request, res: Response) {
        const comic = await ComicService.findById(parseInt(req.params.id))
        req.body.id = comic?.id;

        const updatedComics = await ComicService.update(comic?._id, req.body)
        return typeof(updatedComics) === 'string' ? res.status(404).send(updatedComics) : res.json(updatedComics);
    }

    async delete(req: Request, res: Response) {
        const comic = await ComicService.findById(parseInt(req.params.id))
        const deleteComics = await ComicService.delete(comic?._id)
        return deleteComics.includes('não encontrado') ? res.status(404).send(deleteComics) : res.send(deleteComics)
    }
}
