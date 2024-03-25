import express from 'express';
import cors from 'cors';
import { logger } from 'logger-express';
import 'dotenv/config';
import postRoutes from './routes/postRoutes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger());

app.use('/api/v1', postRoutes);

app.listen(PORT, console.log(`Server on http://localhost:${PORT}`));
