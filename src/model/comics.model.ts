import { Schema, model } from 'mongoose';

const comicsKeys = {
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [{ type_: String, language: String, text: String }],
    resourceURI: String,
    series: { id: Number, title: String },
    prices: [{ type_: String, price: Number }],
    creators: [{ id: Number, fullName: String, }],
    characters: [{ id: Number, name: String, }],
    stories: [{ id: Number, title: String, }],
    events: [{ id: Number, title: String }]
}


const comicsModel = new Schema (
    comicsKeys,
    {timestamps: true}
);

export default model('Comics', comicsModel);
