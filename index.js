import express from 'express';
import path from 'path';
import { recipeRoute, userRoute } from './server/src/routes/index';
import config from 'dotenv';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import db from './server/src/models/index.js';
import webpackConfig from './webpack.config';
config.config()


const port = process.env.PORT || 9000;
const app = express();

app.use(express.static('client/public'));

if (process.env.NODE_ENV !== 'test') {
	const compiler = webpack(webpackConfig);
 	app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
}


app.use('/api/v1/recipes', recipeRoute);

app.use('/api/v1/users', userRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/public/index.html'));
});

db.sequelize.sync().then(() => {
	app.listen(port, () => {
	  console.log(`listening to port ${port}`);
	});
});

export { app };