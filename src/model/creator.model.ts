import { Schema, model } from 'mongoose';

const creatorKeys = {
    id: Number,
    fullName: String,
    resourceURI: String,
    thumbnail: { path: String, extension: String},
    urls: [{ _id: false, type: {type: String}, url: String }]
}

const creatorModel = new Schema (
    creatorKeys,
    {timestamps: true}
);

export default model('Creator', creatorModel);
