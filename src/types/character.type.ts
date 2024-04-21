export interface characterType{
    id: Number,
    name: String,
    description: String,
    resourceURI: String,
    comics:[{ id: Number, title: String }],
    stories:[{ id: Number, title: String }],
    events: [{ id: Number, title: String }],
    series: [{ id: Number, title: String }]
}