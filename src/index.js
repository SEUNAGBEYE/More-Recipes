import express from "express";
import { recipeRoute } from "../routes/recipes";
import { recipe } from "../src/recipes";
import { json, urlencoded } from 'body-parser';

const port = process.env.PORT || 8000;
const app = express();

app.use('/api/v1/recipes', recipeRoute)
app.listen(port, () => {
	console.log(`listening to port ${port}`);
})

export { app }