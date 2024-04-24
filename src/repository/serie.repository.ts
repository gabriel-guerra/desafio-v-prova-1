import serieModel from "../model/serie.model";
import { serieType } from "../types/serie.type";


class SerieRepository{

    async createSerie(serie: serieType){
        return await serieModel.create(serie);
    }

    async findAllSeries(){
        return await serieModel.find();
    }

    async findSerieByTitle(serieTitle: String){
        return await serieModel.find({title: serieTitle});
    }

    async find(query: any){
        return await serieModel.find(query);
    }


}

export default new SerieRepository();



