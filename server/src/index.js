import express from 'express';
import { recipeRoute } from '../routes/recipes';

const port = process.env.PORT || 7000;
const app = express();

app.use('/api/v1/recipes', recipeRoute);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

export { app };