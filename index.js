import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const DB_URL = `mongodb+srv://user:user@cluster0.ocfyfud.mongodb.net/?retryWrites=true&w=majority`

const app = express();
app.use(cors({origin : ['https://deploy-preview-10--amazing-gaufre-1ebc58.netlify.app/', 'http://localhost:8080/', 'https://genuine-pastelito-0e12dc.netlify.app/'],
//  credentials: true, 
 preflightContinue: true, 
 exposedHeaders: ['X-Access-Token']}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', router)
// ['https://deploy-preview-10--amazing-gaufre-1ebc58.netlify.app/', 'http://localhost:8080/', 'https://genuine-pastelito-0e12dc.netlify.app/']


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