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
        image: {
            data: Buffer, 
            contentType: String
        }
    }
)

mongoose.model('GallerySchema', GallerySchema);