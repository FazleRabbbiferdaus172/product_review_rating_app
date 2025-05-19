import express, { Request, Response } from 'express';
import productRouter from './productRoute';

const app = express();
const port: number = 3000;

app.use(express.json());
app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
