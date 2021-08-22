const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        itemType: {
            type: String
        },
        imageURL: {
            type: String
        }
    }
)

mongoose.model('GallerySchema', GallerySchema);