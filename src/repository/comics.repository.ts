import comicsModel from "../model/comics.model";
import { comicsType } from "../types/comics.type";


class ComicsRepository{

    async createComics(comicBook: comicsType){

        return await comicsModel.create(comicBook);
    
    }


    async findAllCharacters(){
        
        return await comicsModel.find();

    }


}

export default new ComicsRepository();



