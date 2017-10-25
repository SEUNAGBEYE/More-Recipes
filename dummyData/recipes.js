let recipes = [
	{
		"id": 1,
		"name": "Pasta",
		"image": "assets/img/pasta.jpg",
		"upvote": 1,
		"user_likes": [1],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 1,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	},

	{
		"id": 2,
		"name": "Banana Split",
		"image": "assets/img/banana_split.jpg",
		"upvote": 1,
		"user_likes": [2],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 2,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	},

	{
		"id": 3,
		"name": "Creme Salad",
		"image": "assets/img/salad.jpeg",
		"upvote": 1,
		"user_likes": [3],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 3,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	},

	{
		"id": 4,
		"name": "Jollof Rice",
		"image": "assets/img/jollof_rice.jpeg",
		"upvote": 1,
		"user_likes": [4],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 4,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	},

	{
		"id": 5,
		"name": "Rosted Chicken",
		"image": "assets/img/rosted_chicken.jpeg",
		"upvote": 1,
		"user_likes": [5],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 5,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	},

	{
		"id": 6,
		"name": "Madrelle Chips",
		"image": "assets/img/chips.jpeg",
		"upvote": 1,
		"user_likes": [6],
		"downvote": 0,
		"user_dislike": [],
		"categories": [],
		"owner_id": 6,
		"views": 1,
		"reviews": [
			{
				"user_id": 1,
				"body": "lorem_ipsum is good"
			}
		],
		"ingredients": ["flour", "sugar", "yeast"],
		"steps": {
			1: "step1",
			2: "step2"
		},
		"description": "lorem ipsum"
	}
];

let categories = [

	{
		"id": 1,
		"name": "Breakfast",
		"image": "assets/img/breakfast.jpeg",
		"recipes": [1],
	},

	{
		"id": 2,
		"name": "Lunch",
		"image": "assets/img/lunch.jpg",
		"recipes": [2],
	},

	{
		"id": 3,
		"name": "Dinner",
		"image": "assets/img/dinner.jpeg",
		"recipes": [3],
	},

	{
		"id": 4,
		"name": "Desserts",
		"image": "assets/img/desserts.jpeg",
		"recipes": [4],
	},

	{
		"id": 5,
		"name": "Noodles",
		"image": "assets/img/noodles.jpeg",
		"recipes": [5],
	},

	{
		"id": 6,
		"name": "Drinks",
		"image": "assets/img/drinks.jpeg",
		"recipes": [6],
	},

	{
		"id": 7,
		"name": "Beverages",
		"image": "assets/img/pasta.jpg",
		"recipes": [7],
	}
]

export  { recipes, categories }
// export default categories;
