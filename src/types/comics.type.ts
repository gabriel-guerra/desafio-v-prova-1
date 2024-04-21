export interface comicsType{
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [{ type_: string, language: String, text: String }],
    resourceURI: String,
    series: { id: Number, title: String },
    prices: [{ type_: String, price: Number }],
    creators: [{ id: Number, name: String, }],
    characters: [{ id: Number, fullName: String, }],
    stories: [{ id: Number, title: String, }],
    events: [{ id: Number, title: String }]
}