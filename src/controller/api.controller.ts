import { Request, Response } from "express";
import apiService from "../service/api.service";

class ApiController{

    async fillDatabase(req: Request, res:Response){
        
        await apiService.exec();
        return res.send(200);
       
    }

}

export default new ApiController();