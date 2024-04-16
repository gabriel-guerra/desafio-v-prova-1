import serieModel from "../model/serie.model";
import { serieType } from "../types/serie.type";


class SerieRepository{

    async createSerie(serie: serieType){

        return await serieModel.create(serie);
    
    }


    async findAllSeries(){
        
        return await serieModel.find();

    }


}

export default new SerieRepository();



