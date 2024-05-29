import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
const app = express()
// import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import all routes
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//folder to save images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//routers
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

export default app;