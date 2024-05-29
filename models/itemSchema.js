import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    starting_price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    current_price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    image_url: {
        type: String
    }
},
    {
        timestamps: true
    }
);


export default new mongoose.model("Item", itemSchema);