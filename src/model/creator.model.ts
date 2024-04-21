import { Schema, model } from 'mongoose';

const creatorKeys = {
    id: Number,
    fullName: String,
    resourceURI: String,
    series: [{ id: Number, title: String }],
    stories: [{ id: Number, title: String, }],
    comics: [{ id: Number, title: String }],
    events: [{ id: Number, title: String }]
}

const creatorModel = new Schema (
    creatorKeys,
    {timestamps: true}
);

export default model('Creator', creatorModel);
