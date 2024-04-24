import { Request, Response } from "express";
import serieService from "../service/serie.service";

class SerieController{

    async findSerieByTitle(req: Request, res:Response){
        return res.json(await serieService.findSerieByTitle(req.params.title));
    }

    async findSerie(req: Request, res:Response){

        if (Object.keys(req.query).length > 0){            
            return res.json(await serieService.find(req.query));        
        }else{
            return res.json(await serieService.findAllSeries());
        }

    }

    /*
    
    async function(req: Request, res:Response){

    }
            
    */


}

export default new SerieController();