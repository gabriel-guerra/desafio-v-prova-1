import characterModel from "../model/character.model";
import { characterType } from "../types/character.type";


class CharacterRepository{

    async createCharacter(character: characterType){
        return await characterModel.create(character);
    }

    async findAll(){
        return await characterModel.find();
    }

    async findById(id: Number){
        const findedCharacter = await characterModel.findOne({id: id})
        return findedCharacter
    }

    async update(_id: String, character: characterType){
        const updateCharacter = await characterModel.findByIdAndUpdate(_id, character, {new: true});
        return updateCharacter ? updateCharacter : "Personagem não encontrado"
    }

    async delete(_id:String){
        const character = await characterModel.findByIdAndDelete(_id)
        return character ? "Personagem Removido" : "Personagem não encontrado"
    }

    async twoOrMoreNames(){
        const names = await characterModel.find({ name: { $regex: /[-\s]/g } })
        return names
    }

    async namesReverseOrder(){
        const order = await characterModel.aggregate([{ $sort: { "name": -1 } }])
        return order
    }

}

export default new CharacterRepository();



