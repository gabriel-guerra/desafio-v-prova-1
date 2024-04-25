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
    dates: [{ type_: String, date: Date }],
    prices: [{ type_: String, price: Number }],
    creators: [{ id: Number, fullName: String, role: String}],
    characters: [{ id: Number, name: String, }]
}


const comicsModel = new Schema (
    comicsKeys,
    {timestamps: true}
);

export default model('Comics', comicsModel);
