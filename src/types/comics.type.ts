export interface comicsType{
    id: Number,
    title: String,
    issueNumber: Number,
    description: String,
    format: String,
    pageCount: Number,
    textObjects: [ { language: String, text: String } ],
    resourceURI: String,
    series: { id: Number, name: String },
    prices: [ { type: String, price: Number } ],
    creators: [ { id: Number, name: String, } ],
    characters: [ { id: Number, name: String, } ],
    stories: [ { id: Number, name: String, } ],
    events: [ { resourceURI: String, name: String } ]
}