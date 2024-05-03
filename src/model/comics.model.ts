import { Schema, model } from 'mongoose';

const comicsKeys = {
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [{ _id: false,  type: {type: String}, language: String, text: String }],
    resourceURI: String,
    dates: [{ _id: false, type: {type: String}, date: Date }],
    prices: [{ _id: false, type: {type: String}, price: Number }],
    creators: [{ _id: false, id: Number, fullName: String, role: String}],
    characters: [{ _id: false, id: Number, name: String, }]
}


const comicsModel = new Schema (
    comicsKeys,
    {timestamps: true}
);

export default model('Comics', comicsModel);
