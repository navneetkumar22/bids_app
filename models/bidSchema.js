import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bid_amount: {
        type: mongoose.Types.Decimal128,
        required: [true, "Bid amount is required"]
    }
},
    {
        timestamps: true
    }
);

export default new mongoose.model("Bid", bidSchema);