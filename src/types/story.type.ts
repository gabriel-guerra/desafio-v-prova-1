export interface storyType{
    id: Number,
    title: String,
    description: String,
    resourceURI: String,
    type: String,   
    modified: Date,
    comics:  [{ id: Number, name: String }],
    series: [{ id: Number, name: String }],
    events: [{ id: Number, name: String }],
    characters: [{ id: Number, name: String }],
    creators: [{ id: Number, name: String }],
    originalissue: { id: Number, name: String }
}