import { Request, Response } from "express";

class Hello{

    helloWorld(req: Request, res: Response){
        return res.send("Hello World");
    }

}

export default new Hello();