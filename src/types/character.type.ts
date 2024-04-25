export interface characterType{
    id: Number,
    name: String,
    description: String,
    resourceURI: String,
    urls: [{ type_: String, url: String }],
    thumbnail: { path: String, extension: String }
}