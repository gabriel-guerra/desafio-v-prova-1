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
        const serie = await serieModel.find({id: id})
        return serie
    }

    async update(id: Number, serie: serieType){
        const updateSerie = await serieModel.findByIdAndUpdate(id, serie, {new: true});
        return updateSerie
    }

    async delete(id:Number){
        try {
            await serieModel.findByIdAndDelete(id)
            return "Serie Removida"
        } catch (error) {
            throw new Error(`Não foi possível remover ${error}`)
        }
    }

}

export default new SerieRepository();



