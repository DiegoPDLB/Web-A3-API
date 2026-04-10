import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './utils/db.js';
import routes from './routes/index.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});