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
        try {
            const comic = await comicsModel.findByIdAndDelete(_id)
            return comic ? "Quadrinho Removido" : "Quadrinho não encontrado"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }

}

export default new ComicsRepository();



