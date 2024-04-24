import { Schema, model } from 'mongoose';

const characterKeys = {
    id: Number,
    name: String,
    description: String,
    resourceURI: String,
    urls: [{ type_: String, url: String }],
    thumbnail: { path: String, extension: String}
}

const characterModel = new Schema (
    characterKeys,
    {timestamps: true}
);

export default model('Character', characterModel);