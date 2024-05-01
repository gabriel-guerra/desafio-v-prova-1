export interface creatorType{
    id: Number,
    fullName: String,
    resourceURI: String,
    thumbnail: { path: String, extension: String},
    urls: [{ type_: String, url: String }]
}