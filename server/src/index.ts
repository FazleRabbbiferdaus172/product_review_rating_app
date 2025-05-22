import express, { Request, Response,  } from 'express';
import cors from 'cors'
import productRouter from './productRoute';

const app = express();
const port: number = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors())
app.use(express.json());
app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
