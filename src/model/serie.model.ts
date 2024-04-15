import { Schema, model } from 'mongoose';

/* const apiModel = {
    code: Number,
    status: String,
    copyright: String,
    attributionText: String,
    attributionHTML: String,
    data: {
        offset: Number,
        limit: Number,
        total: Number,
        count: Number,
        results: [
            {
                id: Number,
                title: String,
                description: String,
                resourceURI: String,
                urls: [
                    {
                        type: String,
                        url: String
                    }
                ],
                startYear: Number,
                endYear: Number,
                rating: String,
                type: String,
                modified: Date,
                thumbnail: {
                    path: String,
                    extension: String
                },
                comics: {
                    available: Number,
                    returned: Number,
                    collectionURI: String,
                    items: [
                        {
                            resourceURI: String,
                            name: String
                        }
                    ]
                },
                stories: {
                    available: Number,
                    returned: Number,
                    collectionURI: String,
                    items: [
                        {
                            resourceURI: String,
                            name: String,
                            type: String
                        }
                    ]
                },
                events: {
                    available: Number,
                    returned: Number,
                    collectionURI: String,
                    items: [
                        {
                            resourceURI: String,
                            name: String
                        }
                    ]
                },
                characters: {
                    available: Number,
                    returned: Number,
                    collectionURI: String,
                    items: [
                        {
                            resourceURI: String,
                            name: String
                        }
                    ]
                },
                creators: {
                    available: Number,
                    returned: Number,
                    collectionURI: String,
                    items: [
                        {
                            resourceURI: String,
                            name: String,
                            role: String
                        }
                    ]
                },
                next: {
                    resourceURI: String,
                    name: String
                },
                previous: {
                    resourceURI: String,
                    name: String
                }
            }
        ]
    },
    etag: String
} */

const serieKeys = {
    id: Number, 
    title: String,
    description: String,
    url: String,
    startYear: Number,
    endYear: Number,
    comics: [{id: Number, title: String}], 
    stories: [{id: Number, title: String}],
    characters: [{id: Number, name: String}],
    creators: [{id: Number, fullName: String}]
  }


const serieModel = new Schema (
    serieKeys,
    {timestamps: true}
);

export default model('Serie', serieModel);
