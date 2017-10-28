import Sequelize from 'sequelize';

const sequelize = new Sequelize('more_recipes', 'root', 'password',{
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully authenticated');
  })
  .catch(err => {
    console.error('sorry something happened', err);
  });

const RecipeModel = sequelize.define('recipes', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  downvotes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },

})

RecipeModel.sync({force:true})