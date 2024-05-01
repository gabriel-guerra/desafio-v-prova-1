import characterModel from "../model/character.model";
import { characterType } from "../types/character.type";


class CharacterRepository{

    async createCharacter(character: characterType){
        return await characterModel.create(character);
    }

    async findAll(){
        return await characterModel.find();
    }

    async findById(id: Number){
        const findedCharacter = await characterModel.find({id: id})
        return findedCharacter
    }

    async update(id: Number, character: characterType){
        const updateCharacter = await characterModel.findByIdAndUpdate(id, character, {new: true});
            
        /* {
            id: Number,
            name: String,
            description: String,
            resourceURI: String,
            urls: [{ type_: String, url: String }],
            thumbnail: { path: String, extension: String }
        }, */  

        return updateCharacter
    }

    async delete(id:Number){
        try {
            await characterModel.findByIdAndDelete(id)
            return "Character Removido"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }

}

export default new CharacterRepository();



