export interface serieType{
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