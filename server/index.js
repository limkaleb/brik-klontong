import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
