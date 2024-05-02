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
        const findedComic = await creatorModel.findOne({id: id})
        return findedComic
    }

    async update(_id: String, comic: creatorType){
        const updateComic = await creatorModel.findByIdAndUpdate(_id, comic, {new: true});
        return updateComic ? updateComic : "Criador não encontrado"
    }

    async delete(_id:String){
        try {
            const comic = await creatorModel.findByIdAndDelete(_id)
            return comic ? "Criador Removido" : "Criador não encontrado"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }


}

export default new CreatorRepository();



