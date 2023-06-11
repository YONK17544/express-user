import express from 'express';
import dotenv from 'dotenv';
import { dbConnection} from './config/db.configuration.js';
import indexRouter from "./routes/index.js";
dotenv.config();

dbConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;

app.use(indexRouter);

app.listen(PORT, () =>{
    console.log('listening on port',PORT);
})