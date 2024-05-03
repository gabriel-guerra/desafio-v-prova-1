import { Schema, model } from 'mongoose';

const serieKeys = {
    id: Number, 
    title: String,
    description: String,
    resourceURI: String,
    startYear: Number,
    endYear: Number,
    comics: [{_id: false, id: Number, title: String}], 
    characters: [{_id: false, id: Number, name: String}],
    creators: [{_id: false, id: Number, fullName: String, role: String}]
  }

const serieModel = new Schema (
    serieKeys,
    {timestamps: true}
);

export default model('Serie', serieModel);
