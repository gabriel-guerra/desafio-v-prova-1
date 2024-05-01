import { Request, Response } from "express";
import serieService from "../service/serie.service";

class SerieController{

    async create (req: Request, res: Response) {
        const createdSerie = await serieService.create(req.body)
        res.status(201);
        return res.json(createdSerie)
    }

    async findAll(req:Request, res:Response){
        const findedSeries = await serieService.findAllSeries()
        return res.json(findedSeries)
    }

    async findById(req:Request, res:Response) {
        const findedSerie = await serieService.findById(parseInt(req.params.id))
        return res.json(findedSerie)
    }

    async update(req: Request, res: Response) {
        const updatedSerie = await serieService.update(parseInt(req.params.id), req.body)
        return res.json(updatedSerie)
    }

    async delete(req: Request, res: Response) {
        const deleteSerie = await serieService.delete(parseInt(req.params.id))
        return res.json(deleteSerie)
    }

}

export default new SerieController();