import creatorModel from "../model/creator.model";
import { creatorType } from "../types/creator.type";


class CreatorRepository{

    async createCreator(serie: creatorType){

        return await creatorModel.create(serie);
    
    }


    async findAllCharacters(){
        
        return await creatorModel.find();

    }


}

export default new CreatorRepository();



