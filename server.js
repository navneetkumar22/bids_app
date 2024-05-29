import mongoose from 'mongoose';
import app from './app.js';



//database connection
(async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URI)
            .then(conn => {
                console.log(`Connected to Database: ${conn.connection.host}`);
            })
    } catch (error) {
        console.error(error);
    }
})()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})