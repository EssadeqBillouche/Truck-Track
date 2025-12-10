import express from 'express';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
dotenv.config();


const app = express();

app.use(express.json());

app.use('/login')


app.use(errorMiddleware)
export default app; 
