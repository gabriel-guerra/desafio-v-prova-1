import comicsModel from "../model/comics.model";
import { comicsType } from "../types/comics.type";


class ComicsRepository{

    async createComics(serie: comicsType){

        return await comicsModel.create(serie);
    
    }


    async findAllCharacters(){
        
        return await comicsModel.find();

    }


}

export default new ComicsRepository();



