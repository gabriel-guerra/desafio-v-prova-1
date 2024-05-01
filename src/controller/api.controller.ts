import { Request, Response } from "express";
import apiService from "../service/api.service";

class ApiController{

    async fillDatabase(req: Request, res:Response){
        
        try{
            return res.send(await apiService.exec());
        }catch(error){
            throw new Error(`Erro ao preencher o banco: ${error}`)
        }
       
    }

}

export default new ApiController();