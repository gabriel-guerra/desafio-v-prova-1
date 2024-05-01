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
        return updateCharacter ? updateCharacter : "Personagem não encontrado"
    }

    async delete(_id:String){
        try {
            const character = await characterModel.findByIdAndDelete(_id)
            return character ? "Personagem Removido" : "Personagem não encontrado"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }

}

export default new CharacterRepository();



