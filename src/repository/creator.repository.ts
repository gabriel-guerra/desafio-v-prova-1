import creatorModel from "../model/creator.model";
import { creatorType } from "../types/creator.type";


class CreatorRepository{

    async createCreator(serie: creatorType){
        return await creatorModel.create(serie);
    }


    async findAll(){
        return await creatorModel.find();
    }


}

export default new CreatorRepository();



