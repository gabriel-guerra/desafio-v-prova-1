export interface creatorType{
    id: Number,
    fullName: String,
    resourceURI: String,
    series: [{ id: Number, name: String }],
    stories: [{ id: Number, name: String, }],
    comics: [{ id: Number, name: String }],
    events: [{ id: Number, name: String }]
}