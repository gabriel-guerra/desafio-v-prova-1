import serieModel from "../model/serie.model";
import { serieType } from "../types/serie.type";


class SerieRepository{

    async createSerie(serie: serieType){
        return await serieModel.create(serie);
    }

    async findAllSeries(){
        return await serieModel.find();
    }

    async findById(id: Number){
        const serie = await serieModel.findOne({id: id})
        return serie
    }

    async update(_id: String, serie: serieType){
        const updateSerie = await serieModel.findByIdAndUpdate(_id, serie, {new: true});
        return updateSerie ? updateSerie : "Série não encontrada"
    }

    async delete(id:Number){
        const serie = await serieModel.findByIdAndDelete(id);
        return serie ? "Série Removida" : "Série não encontrada"
    }

}

export default new SerieRepository();



