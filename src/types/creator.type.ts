export interface creatorType{
    id: Number,
    fullName: String,
    resourceURI: String,
    series: [{ id: Number, title: String }],
    stories: [{ id: Number, title: String, }],
    comics: [{ id: Number, title: String }],
    events: [{ id: Number, title: String }]
}