const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true,
        },
        foodDesc: {
            type: String,
            required: true,
        },
        foodPrice: {
            type: Number,
            required: true
        },
        foodSize: {
            type: String
        },
        foodType: {
            type: String,
            required: true
        },
        foodImage: {
            type: String
            // data: Buffer, 
            // contentType: String
        }
    }
);

mongoose.model('MenuSchema', MenuSchema);