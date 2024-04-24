import { Schema, model } from 'mongoose';

const creatorKeys = {
    id: Number,
    fullName: String,
    resourceURI: String
}

const creatorModel = new Schema (
    creatorKeys,
    {timestamps: true}
);

export default model('Creator', creatorModel);
