export interface eventType{
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