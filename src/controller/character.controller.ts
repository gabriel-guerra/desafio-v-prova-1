import { Request, Response } from 'express';
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
        const character = await characterService.findById(parseInt(req.params.id))
        req.body.id = character?.id;

        const updatedCharacter = await characterService.update(character?._id, req.body)
        return typeof(updatedCharacter) === 'string' ? res.status(404).send(updatedCharacter) : res.json(updatedCharacter);
    }

    async delete(req: Request, res: Response) {
        const character = await characterService.findById(parseInt(req.params.id))
        const deleteCharacter = await characterService.delete(character?._id)
        return deleteCharacter.includes('não encontrado') ? res.status(404).send(deleteCharacter) : res.send(deleteCharacter)
    }

    async twoOrMoreNames(req: Request, res: Response){
        const foundChars = await characterService.twoOrMoreNames();
        return res.json(foundChars);
    }

    async namesReverseOrder(req: Request, res: Response){
        const foundChars = await characterService.namesReverseOrder();
        return res.json(foundChars);  
    }
}

export default new CharacterController();