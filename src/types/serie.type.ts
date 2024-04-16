export interface serieType{
    id: Number, 
    title: String,
    description: String,
    url: String,
    startYear: Number,
    endYear: Number,
    comics: [{id: Number, title: String}], 
    stories: [{id: Number, title: String}],
    characters: [{id: Number, name: String}],
    creators: [{id: Number, fullName: String}],
    events: [{id: Number, title: String}]
}