import creatorRepository from "../repository/creator.repository";
import {creatorType} from "../types/creator.type";

 class CreatorService {
    async create (creator:creatorType){
    const createdcreator = await creatorRepository.create(creator);
    return createdcreator
 }

 async findAll() {
    const findedcreator = await creatorRepository.find()
    return findedcreator
 }

 async findById(id: Number) {
    const findedcreator= await creatorRepository.find(id);
    return findedcreator
 }

 async update(_id: any, comic: comicsType){
    const updatecreator = await creatorRepository.findByIdAndUpdate(id, creator);
    return updatecreator
 }

 async delete(_id:any){
   return await creatorRepository.delete(id)
 }
}

export default new CreatorService();