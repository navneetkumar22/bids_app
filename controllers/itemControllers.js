import Item from "../models/itemSchema.js";
// import multer from "multer";
// import path from 'path';


/************************************************************** 
 * @Get_All_Items
 * @Request_type GET
 * @Route /items
 * @description get all auction items (with pagination)
 * @parameters 
 * @returns 10 items per page
 ***************************************************************/

export const allItems = async (req, res) => {
    try {
        let limit = 10;  //sending 10 results per page
        let { page } = req.query;
        page = page ? parseInt(page) : 1

        const allItems = await Item.find()
            .limit(limit)
            .skip((page - 1) * limit)

        //if there are not items
        if (!allItems) {
            throw new Error("There are no items to show")
        }

        res.status(200).json({
            success: true,
            allItems
        })
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Get_Single_Item
 * @Request_type GET
 * @Route /items/:id
 * @description get single item by id
 * @parameters item id
 * @returns fetched item
 ***************************************************************/

export const getItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findById(itemId)

        //if not found
        if (!item) {
            throw new Error("Item not found")
        }

        res.status(200).json({
            success: true,
            item
        })
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Create_An_Item
 * @Request_type POST
 * @Route /items
 * @description create a new item
 * @parameters auth token (authenticated user)
 * @returns success message
 ***************************************************************/

export const createItem = async (req, res) => {
    try {
        const { name, description, starting_price, current_price, end_time } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newItem = await Item.create(
            {
                name,
                description,
                starting_price,
                current_price,
                end_time,
                image_url: imageUrl
            }
        )

        res.status(200).json({
            success: true,
            message: "Item created successfully"
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Update_An_Item
 * @Request_type POST
 * @Route /items/:id
 * @description update an item
 * @parameters item id, auth token (authenticated user)
 * @returns success message
 ***************************************************************/

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findById(itemId)



        //if item not found
        if (!item) {
            throw new Error("Item not found")
        }

        const updateItem = await Item.findByIdAndUpdate(
            { _id: itemId },
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Item updated successfully"
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}


/************************************************************** 
 * @Delete_An_Item
 * @Request_type DELETE
 * @Route /items/:id
 * @description delete an item
 * @parameters item id, auth token (authenticated user)
 * @returns success message
 ***************************************************************/

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findById(itemId);

        //if itme not found
        if (!item) {
            throw new Error("Item not found")
        }

        const deleteItem = await Item.deleteOne({ _id: itemId });

        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        })

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}