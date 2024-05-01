import { Request, Response, request, response} from 'express';
import characterService from "../service/character.service";

class CharacterController {
    async create (req: Request, res: Response) {
        const createdCharacter = await characterService.create(req.body)
        res.status(201);
        return res.json(createdCharacter)
    }

    async findAll(req:Request, res:Response){
        const findedCharacters = await characterService.findAll()
        return res.json(findedCharacters)
    }

    async findById(req:Request, res:Response) {
        const findedCharacter = await characterService.findById(parseInt(req.params.id))
        return res.json(findedCharacter)
    }

    async update(req: Request, res: Response) {
        const updatedCharacter = await characterService.update(parseInt(req.params.id), req.body)
        return res.json(updatedCharacter)
    }

    async delete(req: Request, res: Response) {
        const deleteCharacter = await characterService.delete(parseInt(req.params.id))
        return res.json(deleteCharacter)
    }
}

export default new CharacterController();