import { Schema, model } from 'mongoose';

const eventKeys = {
    id: Number,
    title: String,
    description: String,
    resourceURI: String,
    start: Date,
    end: Date,
    comics: [{ id: Number, title: String }],
    stories: [{ id: Number, title: String }],
    series: [{ id: Number, title: String }],
    characters: [{ id: Number, name: String }],
    creators: [{ id: Number, fullName: String }],
    next: { resourceURI: String, name: String },
    previous: { resourceURI: String, name: String }
}

const eventModel = new Schema (
    eventKeys,
    {timestamps: true}
);

export default model('Event', eventModel);
