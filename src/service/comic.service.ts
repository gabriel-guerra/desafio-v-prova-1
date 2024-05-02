import comicRepository from "../repository/comics.repository";
import {comicsType} from "../types/comics.type";

 class ComicsService {
    async create (comic:comicsType){
    const createdComics = await comicRepository.create(comics);
    return createdComics
 }

 async findAll() {
    const findedComics = await comicRepository.find()
    return findedComics
 }

 async findById(id: Number) {
    const findedComic = await comicRepository.find(id);
    return findedComic
 }

 async update(_id: any, comic: comicsType){
    const updateComics = await comicRepository.findByIdAndUpdate(id, comic);
    return updateComics
 }

 async delete(_id:any){
   return await comicRepository.delete(id)
 }
}

export default new ComicsService();