import creatorModel from "../model/creator.model";
import { creatorType } from "../types/creator.type";


class CreatorRepository{

    async createCreator(serie: creatorType){
        return await creatorModel.create(serie);
    }


    async findAll(){
        return await creatorModel.find();
    }

    async findById(id: Number){
        const foundCreator = await creatorModel.findOne({id: id})
        return foundCreator
    }

    async update(_id: String, creator: creatorType){
        const updateCreator = await creatorModel.findByIdAndUpdate(_id, creator, {new: true});
        return updateCreator ? updateCreator : "Criador não encontrado"
    }

    async delete(_id:String){
        const creator = await creatorModel.findByIdAndDelete(_id)
        return creator ? "Criador Removido" : "Criador não encontrado"
    }

}

export default new CreatorRepository();



