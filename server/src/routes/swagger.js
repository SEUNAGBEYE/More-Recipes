import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';

const router = express.Router();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'More-Recipes API',
    version: '1.0.0',
    description: 'More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt. Suppose a user comes up with a recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favourited recipes on the application.',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/src/routes/user/userRoutes.js', './server/src/routes/recipe/recipeRoutes.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.route('/swagger.json')
  .get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.send(swaggerSpec);
  });

export default router;
