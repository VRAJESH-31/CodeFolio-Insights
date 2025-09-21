import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './routes/auth.route.js';
import AnalyzeRouter from './routes/analyze.route.js';
import {connectToDB} from './utils/db.js';
import { PORT } from './utils/config.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/analyze', AnalyzeRouter);

connectToDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening to app on PORT no ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB Database Failed to connect! ", error);
})