const storyKeys = {
    id: Number,
    title: String,
    description: String,
    resourceURI: String,
    type: String,   
    modified: Date,
    comics:  [
        {
        id: Number,
        name: String
        }
    ],
    series: [
        {
        id: Number,
        name: String
        }
    ],
    events: [
        {
        id: Number,
        name: String
        }
    ],
    characters: [
        {
        resourceURI: String,
        name: String,
        role: String
        }
    ],
    creators: [
        {
        resourceURI: String,
        name: String,
        role: String
        }
    ],
    originalissue: {
        id: Number,
        name: String
    }
}