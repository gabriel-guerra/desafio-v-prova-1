import { Schema, model } from 'mongoose';

const serieKeys = {
    id: Number, 
    title: String,
    description: String,
    resourceURI: String,
    startYear: Number,
    endYear: Number,
    comics: [{id: Number, title: String}], 
    characters: [{id: Number, name: String}],
    creators: [{id: Number, fullName: String, role: String}]
  }

const serieModel = new Schema (
    serieKeys,
    {timestamps: true}
);

export default model('Serie', serieModel);
