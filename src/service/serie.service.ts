import serieRepository from "../repository/serie.repository";

class SerieService{

    //characters
    async findSerieByTitle(name: String){
        const foundSerie = await serieRepository.findSerieByTitle(name);
        return foundSerie;
    }

    async find(query: any){
        return await serieRepository.find(query);
    }

    async findAllSeries(){
        return await serieRepository.findAllSeries();
    }


}

export default new SerieService();