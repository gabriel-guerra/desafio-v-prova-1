import creatorRepository from "../repository/creator.repository";
import {creatorType} from "../types/creator.type";

 class CreatorService {
    
   async create (creator:creatorType){
    const createdcreator = await creatorRepository.createCreator(creator);
    return createdcreator
   }

   async findAll() {
      const findedcreator = await creatorRepository.findAll()
      return findedcreator
   }

   async findById(id: Number) {
      const findedcreator= await creatorRepository.findById(id);
      return findedcreator
   }

   async update(_id: any, creator: creatorType){
      const updatecreator = await creatorRepository.update(_id, creator);
      return updatecreator
   }

   async delete(_id:any){
      return await creatorRepository.delete(_id)
   }
   
}

export default new CreatorService();