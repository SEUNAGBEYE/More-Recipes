import express from 'express';
import path from 'path';
import config from 'dotenv';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import db from './models/index';
import { recipeRoute, userRoute, swagger } from './routes/index';
import webpackConfig from '../../webpack.dev';

config.config();

const port = process.env.PORT || 7000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../client/public')));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
}

app.use('/api/v1/recipes', recipeRoute);

app.use('/api/v1/users', userRoute);
app.use('/api-docs', swagger);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/public/index.html'));
});


db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
});

export default app;
