import express from 'express';
import path from 'path';
import { recipeRoute, userRoute } from './routes/index';
import config from 'dotenv';
import db from './models/index.js';

config.config();

console.log('ji');

const port = process.env.PORT || 6000;
const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}, ../client/src/index.html`);
});

app.use('/api/v1/recipes', recipeRoute);

app.use('/api/v1/users', userRoute);

app.use(express.static(path.join(__dirname, 'client/public')));

db.sequelize.sync().then(() => {
  app.listen(port, () => {
	  console.log(`listening to port ${port}`);
  });
});

export { app };
