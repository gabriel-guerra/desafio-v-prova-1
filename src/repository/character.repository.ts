import characterModel from "../model/character.model";
import { characterType } from "../types/character.type";


class CharacterRepository{

    async createCharacter(character: characterType){

        return await characterModel.create(character);
    
    }


    async findAllCharacters(){
        
        return await characterModel.find();

    }


}

export default new CharacterRepository();



