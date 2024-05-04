import { Request, Response } from 'express';
import creatorService from "../service/creator.service";

class CreatorController {
    async create (req: Request, res: Response) {
        const createdCreator = await creatorService.create(req.body);
        res.status(201);
        return res.json(createdCreator)
    }

    async findAll(req: Request, res: Response) {
        const findedCreator = await creatorService.findAll();
        return res.json(findedCreator)
    }

    async findById(req: Request, res: Response) {
        const findedCreator = await creatorService.findById(parseInt(req.params.id))
        return res.json(findedCreator)
    }

    async update(req: Request, res: Response) {
        const creator = await creatorService.findById(parseInt(req.params.id))
        req.body.id = creator?.id;

        const updatedCreator = await creatorService.update(creator?._id, req.body)
        return typeof(updatedCreator) === 'string' ? res.status(404).send(updatedCreator) : res.json(updatedCreator);
    }

    async delete(req: Request, res: Response) {
        const creator = await creatorService.findById(parseInt(req.params.id))
        const deleteCreator = await creatorService.delete(creator?._id)
        return deleteCreator.includes('não encontrado') ? res.status(404).send(deleteCreator) : res.send(deleteCreator)
    }
}

export default new CreatorController();
