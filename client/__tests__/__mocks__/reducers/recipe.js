const recipeObject = {
  id: 11,
  name: 'Pasta',
  image: 'https://res.cloudinary.com/seun/image/upload/v1512043245/wxyrvvfw4ddoznizmjlb.png',
  categoryId: 1,
  userId: 1,
  upvotes: [1],
  downvotes: [1],
  views: [1],
  description: 'lorem ipsum',
  createdAt: new Date(),
  updatedAt: new Date(),
  reviews: []
};

const allRecipesObject = [recipeObject, recipeObject];

const userRecipesObject = {
  data: allRecipesObject,
  pagination: 2
};

const searchResultsObject = {
  data: allRecipesObject,
  pagination: 2
};

const favouritedRecipesIdsObject = [1, 2, 3, 4, 5];

const recipeReviewsObject = {
  id: '',
  name: '',
  image: '',
  categoryId: '',
  userId: '',
  upvotes: [],
  downvotes: [],
  views: [],
  description: '',
  reviews: ['I love this recipe', 'This recipe is awesome']
};

const recipeCategoryObject = {
  name: 'Breakfast',
  image: 'https://res.cloudinary.com/seun/image/upload/v1514724588/Healthy-Breakfast-1000x620_vxzki0.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};

const recipeCategoriesObject = [recipeCategoryObject, recipeCategoryObject]

export { recipeObject,
  allRecipesObject,
  userRecipesObject,
  favouritedRecipesIdsObject,
  recipeReviewsObject,
  recipeCategoriesObject,
  searchResultsObject
};
