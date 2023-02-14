import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const PORT = process.env.PORT || 8000;

const DB_URL = `mongodb+srv://user:user@cluster0.ocfyfud.mongodb.net/?retryWrites=true&w=majority`

const app = express();

app.use(express.json())
app.use('/api/auth', router)

// app.get('/', (req, res) => {
//     console.log(req.query);
//     res.status(200).json('server is worked')
// })



async function startApp() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('start server on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}



startApp();