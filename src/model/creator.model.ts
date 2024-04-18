import { Schema, model } from 'mongoose';

const creatorKeys = {
    id: Number,
    fullName: String,
    resourceURI: String,
    series: [{ id: Number, name: String }],
    stories: [{ id: Number, name: String, }],
    comics: [{ id: Number, name: String }],
    events: [{ id: Number, name: String }]
}

const creatorModel = new Schema (
    creatorKeys,
    {timestamps: true}
);

export default model('Creator', creatorModel);
