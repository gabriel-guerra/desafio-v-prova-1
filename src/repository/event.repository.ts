import eventModel from "../model/event.model";
import { eventType } from "../types/event.type";


class EventRepository{

    async createEvent(serie: eventType){

        return await eventModel.create(serie);
    
    }


    async findAllCharacters(){
        
        return await eventModel.find();

    }


}

export default new EventRepository();



