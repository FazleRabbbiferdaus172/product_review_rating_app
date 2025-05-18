import express, { Request, Response } from 'express';
import router from './route';

const app = express();
const port: number = 3000;

app.use('/products', router)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
