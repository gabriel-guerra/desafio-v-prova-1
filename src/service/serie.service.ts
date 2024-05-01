import { serieType } from "src/types/serie.type";
import serieRepository from "../repository/serie.repository";

class SerieService{

    async create (serie:serieType){
        const createdCharacter = await serieRepository.createSerie(serie)
        return createdCharacter
    }

    async findAllSeries(){
        const findedCharacters = await serieRepository.findAllSeries()
        return findedCharacters
    }

    async findById(id: Number){
        const findedCharacter = await serieRepository.findById(id)
        return findedCharacter
    }

    async update(id: Number, serie: serieType){
        const updateCharacter = await serieRepository.update(id, serie);
        return updateCharacter
    }

    async delete(id:Number){
        return await serieRepository.delete(id)
    }

}

export default new SerieService();