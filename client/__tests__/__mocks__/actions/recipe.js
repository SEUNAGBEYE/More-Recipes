const recipe = {
  id: 1,
  name: 'Amala',
  image: 'This is a test image',
  description: 'This is the decription',
  ingredients: ['This is the ingredients', 'This is the second ingredient'],
  steps: ['This is the steps', 'This is the second steps'],
};

const recipeResponse = {
  status: 'Success',
  data: recipe
};

const deleteRecipeResponse = {
  status: 'Success',
  data: {}
};

export { recipeResponse,
  deleteRecipeResponse
};

