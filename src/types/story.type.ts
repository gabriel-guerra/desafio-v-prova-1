export interface storyType{
    id: Number,
    title: String,
    description: String,
    resourceURI: String,
    type: String,   
    modified: Date,
    comics:  [{ id: Number, title: String }],
    series: [{ id: Number, title: String }],
    events: [{ id: Number, title: String }],
    characters: [{ id: Number, name: String }],
    creators: [{ id: Number, fullName: String }],
    originalissue: { id: Number, name: String }
}