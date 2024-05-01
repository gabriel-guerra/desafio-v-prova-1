import characterRepository from "../repository/character.repository";
import {characterType} from "../types/character.type";

class CharacterService {
    async create (character:characterType){
        const createdCharacter = await characterRepository.createCharacter(character)
        return createdCharacter
    }

    async findAll(){
        const findedCharacters = await characterRepository.findAll()
        return findedCharacters
    }

    async findById(id: Number){
        const findedCharacter = await characterRepository.findById(id)
        return findedCharacter
    }

    async update(id: Number, character: characterType){
        const updateCharacter = await characterRepository.update(id, character);
        return updateCharacter
    }

    async delete(id:Number){
        return await characterRepository.delete(id)
    }
}

export default new CharacterService();