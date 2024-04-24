import { Schema, model } from 'mongoose';

const characterKeys = {
    id: Number,
    name: String,
    description: String,
    resourceURI: String
}

const characterModel = new Schema (
    characterKeys,
    {timestamps: true}
);

export default model('Character', characterModel);