export interface comicsType{
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [{ type: {type: String}, language: String, text: String }],
    resourceURI: String,
    dates: [{ type: {type: String}, date: Date }],
    prices: [{ type: {type: String}, price: Number }],
    creators: [{ id: Number, fullName: String, role: String}],
    characters: [{ id: Number, fullName: String, }]
}