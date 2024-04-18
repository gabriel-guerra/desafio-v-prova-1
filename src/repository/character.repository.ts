import characterModel from "../model/character.model";
import { characterType } from "../types/character.type";


class CharacterRepository{

    async createCharacter(serie: characterType){

        return await characterModel.create(serie);
    
    }


    async findAllCharacters(){
        
        return await characterModel.find();

    }


}

export default new CharacterRepository();



