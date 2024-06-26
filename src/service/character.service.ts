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

    async update(_id: any, character: characterType){
        const updateCharacter = await characterRepository.update(_id, character);
        return updateCharacter
    }

    async delete(_id:any){
        return await characterRepository.delete(_id)
    }

    async twoOrMoreNames(){
        const foundChars = characterRepository.twoOrMoreNames();
        return foundChars
    }

    async namesReverseOrder(){
        const foundChars = characterRepository.namesReverseOrder();
        return foundChars
    }
}

export default new CharacterService();