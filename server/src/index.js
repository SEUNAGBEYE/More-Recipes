import express from 'express';
import { recipeRoute, userRoute } from './routes/index';
import config from 'dotenv';

config.config()

const port = process.env.PORT || 7000;
const app = express();

app.use('/api/v1/recipes', recipeRoute);

app.use('/api/v1/users', userRoute);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export { app };