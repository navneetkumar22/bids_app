import Bid from "../models/bidSchema.js";
import Notification from "../models/notificationSchema.js";

/************************************************************** 
 * @Get_All_Bids
 * @Request_type GET
 * @Route /items/:itemId/bids
 * @description get all bids for a specific item
 * @parameters itemId
 * @returns all bids associated with an item id
 ***************************************************************/

export const allBids = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        //find all bids
        const bids = await Bid.find({ item_id: itemId });

        //if no bids found
        if (!bids) {
            return res.status(404).json({
                success: false,
                message: "No bids found for the given item"
            })
        }

        res.status(200).json({
            success: true,
            bids
        })
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Place_A_Bid
 * @Request_type POST
 * @Route /items/:itemId/bids
 * @description Place a new bid on a specific item
 * @parameters itemId, bid amount
 * @returns success message
 ***************************************************************/

export const newBid = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.user._id;
        const bidAmount = req.body.amount;

        if (!bidAmount) {
            throw new Error("Bid amount is required")
        }

        //create a new bid for given item id
        const newBid = await Bid.create({
            item_id: itemId,
            user_id: userId,
            bid_amount: bidAmount
        })

        //create notification for above bid
        const newNotification = await Notification.create({
            user_id: userId,
            message: "A new bid has been added"
        })

        res.status(200).json({
            success: true,
            message: "Bid created successfully"
        })

        return { itemId, userId, bidAmount };

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}