import storyModel from "../model/story.model";
import { storyType } from "../types/story.type";


class StoryRepository{

    async createStory(serie: storyType){

        return await storyModel.create(serie);
    
    }


    async findAllCharacters(){
        
        return await storyModel.find();

    }


}

export default new StoryRepository();



