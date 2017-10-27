const recipes = [
  {
    id: 1,
    name: 'Pasta',
    image: 'assets/img/pasta.jpg',
    upvotes: 1,
    user_likes: [1],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 1,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  },

  {
    id: 2,
    name: 'Banana Split',
    image: 'assets/img/banana_split.jpg',
    upvotes: 11,
    user_likes: [2],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 2,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  },

  {
    id: 3,
    name: 'Creme Salad',
    image: 'assets/img/salad.jpeg',
    upvotes: 15,
    user_likes: [3],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 3,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  },

  {
    id: 4,
    name: 'Jollof Rice',
    image: 'assets/img/jollof_rice.jpeg',
    upvotes: 1,
    user_likes: [4],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 4,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  },

  {
    id: 5,
    name: 'Rosted Chicken',
    image: 'assets/img/rosted_chicken.jpeg',
    upvotes: 1,
    user_likes: [5],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 5,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  },

  {
    id: 6,
    name: 'Madrelle Chips',
    image: 'assets/img/chips.jpeg',
    upvotes: 21,
    user_likes: [6],
    downvotes: 0,
    user_dislike: [],
    categories: [],
    owner_id: 6,
    views: 1,
    reviews: [
      {
        user_id: 1,
        body: 'lorem_ipsum is good'
      }
    ],
    ingredients: ['flour', 'sugar', 'yeast'],
    steps: {
      1: 'step1',
      2: 'step2'
    },
    description: 'lorem ipsum'
  }
];

const categories = [

  {
    id: 1,
    name: 'Breakfast',
    image: 'assets/img/breakfast.jpeg',
    recipes: [1],
  },

  {
    id: 2,
    name: 'Lunch',
    image: 'assets/img/lunch.jpg',
    recipes: [2],
  },

  {
    id: 3,
    name: 'Dinner',
    image: 'assets/img/dinner.jpeg',
    recipes: [3],
  },

  {
    id: 4,
    name: 'Desserts',
    image: 'assets/img/desserts.jpeg',
    recipes: [4],
  },

  {
    id: 5,
    name: 'Noodles',
    image: 'assets/img/noodles.jpeg',
    recipes: [5],
  },

  {
    id: 6,
    name: 'Drinks',
    image: 'assets/img/drinks.jpeg',
    recipes: [6],
  },

  {
    id: 7,
    name: 'Beverages',
    image: 'assets/img/pasta.jpg',
    recipes: [7],
  }
];

export { recipes };
// export default categories;
