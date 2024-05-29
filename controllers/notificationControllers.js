import Notification from "../models/notificationSchema.js";

/************************************************************** 
 * @Get_notifications
 * @Request_type GET
 * @Route /notifications
 * @description get all notifications for logged-in user
 * @parameters auth token
 * @returns all notifications
 ***************************************************************/

export const allNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        //get all notifications
        const notifications = await Notification.find({ user_id: userId })

        //if not found
        if (!notifications) {
            throw new Error("There are no notifications")
        }

        res.status(200).json({
            success: true,
            notifications
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}

/************************************************************** 
 * @Update_notifications
 * @Request_type POST
 * @Route /notifications
 * @description Mark notifications as read
 * @parameters auth token
 * @returns all notifications
 ***************************************************************/

export const updateNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        //update all notifications
        const modifiedNotifications = await Notification.updateMany(
            { user_id: userId },
            { $set: { is_read: true } }
        )

        res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}