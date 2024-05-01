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
        const findedCharacter = await characterModel.findOne({id: id})
        return findedCharacter
    }

    async update(_id: String, character: characterType){
        const updateCharacter = await characterModel.findByIdAndUpdate(_id, character, {new: true});
            
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

    async delete(id:String){
        try {
            await characterModel.findByIdAndDelete(id)
            return "Character Removido"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }

}

export default new CharacterRepository();



