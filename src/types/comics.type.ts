export interface comicsType{
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [{ type_: string, language: String, text: String }],
    resourceURI: String,
    dates: [{ type_: String, date: Date }],
    prices: [{ type_: String, price: Number }],
    creators: [{ id: Number, fullName: String, role: String}],
    characters: [{ id: Number, fullName: String, }]
}