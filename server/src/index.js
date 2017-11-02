import express from 'express';
import { recipeRoute, userRoute } from './routes/index';
import config from 'dotenv';
import db from './models/index.js';
config.config()

const port = process.env.PORT || 8000;
const app = express();

app.use('/api/v1/recipes', recipeRoute);

app.use('/api/v1/users', userRoute);

db.sequelize.sync().then(() => {
	app.listen(port, () => {
	  console.log(`listening to port ${port}`);
	});
});



export { app };