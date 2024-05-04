import comicsModel from "../model/comics.model";
import { comicsType } from "../types/comics.type";


class ComicsRepository{

    async createComics(comicBook: comicsType){
        return await comicsModel.create(comicBook);
    }


    async findAll(){
        return await comicsModel.find();
    }

    async findById(id: Number){
        const findedComic = await comicsModel.findOne({id: id})
        return findedComic
    }

    async update(_id: String, comic: comicsType){
        const updateComic = await comicsModel.findByIdAndUpdate(_id, comic, {new: true});
        return updateComic ? updateComic : "Quadrinho não encontrado"
    }

    async delete(_id:String){
        const comic = await comicsModel.findByIdAndDelete(_id)
        return comic ? "Quadrinho Removido" : "Quadrinho não encontrado"
    }

    async biggestDescription(){
        const foundComic = await comicsModel.aggregate([{ $project: { id: 1, descriptionLength: { $strLenCP: "$description" } } },
        { $sort: { descriptionLength: -1 } },
        { $limit: 1 }])

        return comicsModel.findOne({id: foundComic[0].id})
    }

}

export default new ComicsRepository();



