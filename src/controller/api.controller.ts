import { Request, Response } from "express";
import apiService from "../service/api.service";

class ApiController{

    async fillDatabase(req: Request, res:Response){
        
        try{
            const response = await apiService.exec();
            return response !== 'OK' ? res.status(202).send(response) : res.send(response)
        }catch(error){
            throw new Error(`Erro ao preencher o banco: ${error}`)
        }
       
    }

}

export default new ApiController();