import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config/db';
import router from './routes';
import errorHandler from './middlewares/errorHandler';

connectDB();

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

export default app