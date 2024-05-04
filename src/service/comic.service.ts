import comicRepository from "../repository/comics.repository";
import {comicsType} from "../types/comics.type";

 class ComicsService {
    async create (comics:comicsType){
    const createdComics = await comicRepository.createComics(comics);
    return createdComics
   }

   async findAll() {
      const findedComics = await comicRepository.findAll()
      return findedComics
   }

   async findById(id: Number) {
      const findedComic = await comicRepository.findById(id);
      return findedComic
   }

   async update(_id: any, comic: comicsType){
      const updateComics = await comicRepository.update(_id, comic);
      return updateComics
   }

   async delete(_id:any){
      return await comicRepository.delete(_id)
   }
   
   async biggestDescription(){
      const foundComic = await comicRepository.biggestDescription()
      return foundComic
   }

   async mostRecentEdition(id: Number){
      const comic = await this.findById(id);
      const newest = comic?.dates.reduce((date1, date2) => {
         return date1.date! > date2.date! ? date1 : date2;
      })

      return newest;
   } 

}

export default new ComicsService();