export interface characterType{
    id: Number,
    name: String,
    description: String,
    resourceURI: String,
    comics:[{ id: Number, name: String }],
    stories:[{ id: Number, name: String }],
    events: [{ id: Number, name: String }],
    series: [{ id: Number, name: String }]
}