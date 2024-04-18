import { Schema, model } from 'mongoose';

const eventKeys = {
    id: Number,
    title: String,
    description: String,
    resourceURI: String,
    start: Date,
    end: Date,
    comics: [{ id: Number, name: String }],
    stories: [{ id: Number, name: String }],
    series: [{ id: Number, name: String }],
    characters: [{ id: Number, name: String }],
    creators: [{ id: Number, name: String }],
    next: { resourceURI: String, name: String },
    previous: { resourceURI: String, name: String }
}

const eventModel = new Schema (
    eventKeys,
    {timestamps: true}
);

export default model('Event', eventModel);
